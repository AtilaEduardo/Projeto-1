const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbDir = path.resolve(__dirname, 'data');
const dbPath = path.join(dbDir, 'db.sqlite');

// Verifica se o diretório existe, se não existir cria
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');

    // Criando tabela de usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nameUser TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telephone TEXT UNIQUE NOT NULL,
        datebirth DATE NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        address TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        cep TEXT NOT NULL,
        city TEXT NOT NULL,
        uf TEXT NOT NULL,
        passwordSecurity TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de usuários:', err.message);
      } else {
        console.log('Tabela de usuários criada ou já existente.');
      }
    });

    // Criando tabela de produtos com as flags de ofertas e cupons
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        amount INT NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        user_id INTEGER,
        offers BOOLEAN DEFAULT 0,  -- Adicionando flag para ofertas
        coupons BOOLEAN DEFAULT 0, -- Adicionando flag para cupons
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de produtos:', err.message);
      } else {
        console.log('Tabela de produtos criada ou já existente.');
      }
    });
  }
});

module.exports = db;
