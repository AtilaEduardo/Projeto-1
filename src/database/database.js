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
        isAdm BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de usuários:', err.message);
      } else {
        console.log('Tabela de usuários criada ou já existente.');
      }
    });

    // Criando tabela de produtos
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        amount INT NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        offers BOOLEAN DEFAULT 0,
        coupons BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de produtos:', err.message);
      } else {
        console.log('Tabela de produtos criada ou já existente.');
      }
    });

    // Criando tabela de suporte
    db.run(`
      CREATE TABLE IF NOT EXISTS support_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        support_type TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de solicitações de suporte:', err.message);
      } else {
        console.log('Tabela de suporte criada ou já existente.');
      }
    });
  }
});

module.exports = db;
