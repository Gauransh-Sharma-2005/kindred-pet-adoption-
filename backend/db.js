const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
const dbPath = isVercel 
  ? path.join('/tmp', 'kindred.db') 
  : path.join(__dirname, 'kindred.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database error:', err);
  else console.log(`Connected to SQLite at ${dbPath}`);
});

// Setup tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT,
      age INTEGER,
      ageGroup TEXT,
      gender TEXT,
      location TEXT,
      status TEXT DEFAULT 'Available',
      description TEXT,
      fee TEXT,
      image TEXT,
      gallery TEXT,
      weight TEXT,
      color TEXT,
      vaccinated INTEGER DEFAULT 0,
      sterilized INTEGER DEFAULT 0,
      medicalStatus TEXT,
      temperament TEXT,
      favoriteFood TEXT,
      favoriteToy TEXT,
      likes TEXT,
      dislikes TEXT,
      energyLevel TEXT,
      trainingLevel TEXT,
      shelterName TEXT,
      rescueStory TEXT,
      routine TEXT,
      availableSince TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS adoption_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id TEXT NOT NULL,
      applicant_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      living_environment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      pet_id TEXT NOT NULL
    )
  `);
});

module.exports = db;