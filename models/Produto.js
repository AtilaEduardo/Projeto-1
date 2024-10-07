const db = require('../db/database');

class Produto {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static add({ nome, descricao, preco, estoque, usuario_idusuario }) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO produtos (nome, descricao, preco, estoque, usuario_idusuario) VALUES (?, ?, ?, ?, ?)';
      db.run(query, [nome, descricao, preco, estoque, usuario_idusuario], (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static getProductsByPage(page, itemsPerPage) {
    const offset = (page - 1) * itemsPerPage;
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM produtos LIMIT ? OFFSET ?';
      db.all(query, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = Produto;
