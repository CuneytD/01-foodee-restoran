const sqlite3 = require('sqlite3').verbose();
const Anayemek = require('../models/anayemek');
const Icecek = require('../models/icecekler');

const db = new sqlite3.Database('menu.db');


db.serialize(() => {
  // anayemekler tablosunu oluştur
  db.run(`
    CREATE TABLE IF NOT EXISTS anayemekler (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      imageUrl TEXT,
      isActive INTEGER,
      isHome INTEGER
    )
  `);

  // icecekler tablosunu oluştur
  db.run(`
    CREATE TABLE IF NOT EXISTS icecekler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      imageUrl TEXT,
      isActive INTEGER,
      isHome INTEGER
    )
  `);
  });


module.exports = db;