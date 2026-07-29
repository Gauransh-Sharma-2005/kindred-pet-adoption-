const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.join(__dirname, 'kindred.db');
const db = new DatabaseSync(DB_PATH);

db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS pets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age TEXT,
    ageGroup TEXT,
    gender TEXT,
    location TEXT,
    status TEXT DEFAULT 'Available',
    description TEXT,
    fee TEXT,
    image TEXT,
    gallery TEXT DEFAULT '[]',
    weight TEXT,
    color TEXT,
    vaccinated INTEGER DEFAULT 0,
    sterilized INTEGER DEFAULT 0,
    medicalStatus TEXT,
    temperament TEXT,
    favoriteFood TEXT,
    favoriteToy TEXT,
    likes TEXT DEFAULT '[]',
    dislikes TEXT DEFAULT '[]',
    energyLevel TEXT,
    trainingLevel TEXT,
    availableSince TEXT,
    shelterName TEXT,
    rescueStory TEXT,
    routine TEXT
  );

  CREATE TABLE IF NOT EXISTS adoption_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id TEXT NOT NULL,
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    living_environment TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
  );

  CREATE TABLE IF NOT EXISTS favorites (
    session_id TEXT NOT NULL,
    pet_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (session_id, pet_id)
  );
`);

// node:sqlite's DatabaseSync has no built-in `.transaction()` helper like
// better-sqlite3 did, so provide a small equivalent: pass a function that
// takes the row/array of rows to insert, get back a function you call with
// that data, e.g. `const run = withTransaction(fn); run(rows);`
function withTransaction(fn) {
  return (...args) => {
    db.exec('BEGIN');
    try {
      const result = fn(...args);
      db.exec('COMMIT');
      return result;
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  };
}

module.exports = { db, withTransaction };