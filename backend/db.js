const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Determine if running on Vercel
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';

// Vercel serverless environment only allows write operations in /tmp
const dbPath = isVercel 
  ? path.join('/tmp', 'kindred.db') 
  : path.join(__dirname, 'kindred.db');

// Ensure database file connection works smoothly
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log(`Connected to SQLite database at: ${dbPath}`);
  }
});

// Create tables automatically if they don't exist yet in /tmp/kindred.db
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      breed TEXT,
      age INTEGER,
      gender TEXT,
      size TEXT,
      description TEXT,
      image TEXT,
      adopted INTEGER DEFAULT 0
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id TEXT NOT NULL
    )
  `);
});

module.exports = db;