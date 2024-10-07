const db = require('./database'); // Supondo que haja um módulo para conectar ao banco

function autenticarUsuario(usuario, senha) {
  return db.query('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha])
    .then(results => {
      return results.length > 0;
    })
    .catch(err => {
      console.error('Erro ao consultar o banco de dados:', err);
      return false;
    });
}

module.exports = { autenticarUsuario };
