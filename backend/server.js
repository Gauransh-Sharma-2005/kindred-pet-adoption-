const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Row from SQLite -> JSON shape the frontend expects
function serializePet(row) {
  return {
    ...row,
    gallery: JSON.parse(row.gallery || '[]'),
    likes: JSON.parse(row.likes || '[]'),
    dislikes: JSON.parse(row.dislikes || '[]'),
    vaccinated: !!row.vaccinated,
    sterilized: !!row.sterilized,
  };
}

// --- Pets ---

// GET /api/pets?query=&species=&gender=
app.get('/api/pets', (req, res) => {
  const { query = '', species = 'All', gender = 'All' } = req.query;

  let sql = 'SELECT * FROM pets WHERE 1=1';
  const params = [];

  if (query) {
    sql += ' AND (LOWER(name) LIKE ? OR LOWER(breed) LIKE ?)';
    const like = `%${query.toLowerCase()}%`;
    params.push(like, like);
  }
  if (species && species !== 'All') {
    sql += ' AND species = ?';
    params.push(species);
  }
  if (gender && gender !== 'All') {
    sql += ' AND gender = ?';
    params.push(gender);
  }
  sql += ' ORDER BY availableSince DESC';

  const rows = db.prepare(sql).all(...params);
  res.json(rows.map(serializePet));
});

// GET /api/pets/:id
app.get('/api/pets/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Pet not found' });
  res.json(serializePet(row));
});

// Columns a client is allowed to set/update on a pet (id and availableSince
// are server-controlled).
const PET_FIELDS = [
  'name', 'species', 'breed', 'age', 'ageGroup', 'gender', 'location', 'status',
  'description', 'fee', 'image', 'gallery', 'weight', 'color', 'vaccinated',
  'sterilized', 'medicalStatus', 'temperament', 'favoriteFood', 'favoriteToy',
  'likes', 'dislikes', 'energyLevel', 'trainingLevel', 'shelterName',
  'rescueStory', 'routine',
];

function nextPetId() {
  const year = new Date().getFullYear();
  const row = db.prepare(
    `SELECT id FROM pets WHERE id LIKE ? ORDER BY id DESC LIMIT 1`
  ).get(`KND-${year}-%`);
  let seq = 1;
  if (row) {
    seq = parseInt(row.id.split('-')[2], 10) + 1;
  }
  return `KND-${year}-${String(seq).padStart(3, '0')}`;
}

// Normalizes body fields for storage: arrays -> JSON strings, booleans -> 0/1
function normalizeForStorage(body) {
  const out = {};
  for (const field of PET_FIELDS) {
    if (!(field in body)) continue;
    let value = body[field];
    if (field === 'gallery' || field === 'likes' || field === 'dislikes') {
      value = JSON.stringify(Array.isArray(value) ? value : []);
    } else if (field === 'vaccinated' || field === 'sterilized') {
      value = value ? 1 : 0;
    }
    out[field] = value;
  }
  return out;
}

// POST /api/pets  -- create a new pet
app.post('/api/pets', (req, res) => {
  const { name, species } = req.body;
  if (!name || !species) {
    return res.status(400).json({ error: 'name and species are required' });
  }

  const id = nextPetId();
  const data = normalizeForStorage(req.body);
  data.id = id;
  data.status = data.status || 'Available';
  data.availableSince = new Date().toISOString().slice(0, 10);

  const columns = ['id', 'availableSince', ...Object.keys(data).filter(k => k !== 'id' && k !== 'availableSince')];
  const placeholders = columns.map(c => `@${c}`).join(', ');
  db.prepare(`INSERT INTO pets (${columns.join(', ')}) VALUES (${placeholders})`).run(data);

  const row = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);
  res.status(201).json(serializePet(row));
});

// PUT /api/pets/:id  -- update an existing pet (partial updates allowed)
app.put('/api/pets/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM pets WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Pet not found' });

  const data = normalizeForStorage(req.body);
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return res.status(400).json({ error: 'No updatable fields provided' });
  }

  const setClause = keys.map(k => `${k} = @${k}`).join(', ');
  db.prepare(`UPDATE pets SET ${setClause} WHERE id = @id`).run({ ...data, id: req.params.id });

  const row = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id);
  res.json(serializePet(row));
});

// DELETE /api/pets/:id
app.delete('/api/pets/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM pets WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Pet not found' });

  const removePet = db.withTransaction((id) => {
    db.prepare('DELETE FROM adoption_applications WHERE pet_id = ?').run(id);
    db.prepare('DELETE FROM favorites WHERE pet_id = ?').run(id);
    db.prepare('DELETE FROM pets WHERE id = ?').run(id);
  });
  removePet(req.params.id);

  res.status(204).send();
});

// --- Adoption applications ---

// POST /api/adoptions  { petId, name, phone, livingEnvironment }
app.post('/api/adoptions', (req, res) => {
  const { petId, name, phone, livingEnvironment } = req.body;

  if (!petId || !name || !phone) {
    return res.status(400).json({ error: 'petId, name, and phone are required' });
  }

  const pet = db.prepare('SELECT id, status FROM pets WHERE id = ?').get(petId);
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  if (pet.status !== 'Available') {
    return res.status(409).json({ error: 'Pet is not available for adoption' });
  }

  const insert = db.prepare(`
    INSERT INTO adoption_applications (pet_id, applicant_name, phone, living_environment)
    VALUES (?, ?, ?, ?)
  `);
  const info = insert.run(petId, name, phone, livingEnvironment || null);

  // Reserve the pet once an application comes in
  db.prepare(`UPDATE pets SET status = 'Reserved' WHERE id = ?`).run(petId);

  res.status(201).json({ id: info.lastInsertRowid, petId, name, phone, livingEnvironment, status: 'Pending' });
});

// GET /api/adoptions (for shelter-side review, optional)
app.get('/api/adoptions', (req, res) => {
  const rows = db.prepare(`
    SELECT a.*, p.name AS pet_name FROM adoption_applications a
    JOIN pets p ON p.id = a.pet_id
    ORDER BY a.created_at DESC
  `).all();
  res.json(rows);
});

// --- Favorites (keyed by an anonymous client-side session id) ---

// GET /api/favorites/:sessionId
app.get('/api/favorites/:sessionId', (req, res) => {
  const rows = db.prepare('SELECT pet_id FROM favorites WHERE session_id = ?').all(req.params.sessionId);
  res.json(rows.map(r => r.pet_id));
});

// PUT /api/favorites/:sessionId  { petIds: [...] }  -- replaces the full set
app.put('/api/favorites/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { petIds = [] } = req.body;

  const replace = db.withTransaction((ids) => {
    db.prepare('DELETE FROM favorites WHERE session_id = ?').run(sessionId);
    const insert = db.prepare('INSERT INTO favorites (session_id, pet_id) VALUES (?, ?)');
    for (const id of ids) insert.run(sessionId, id);
  });
  replace(petIds);

  res.json({ sessionId, petIds });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);
