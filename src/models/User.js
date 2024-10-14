const bcrypt = require('bcrypt');
const db = require('../database/database');

class User {
  // Método para criar um novo usuário
  static async create(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const hashedPasswordS = await bcrypt.hash(data.passwordSecurity, 10);

      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (nameUser, password, fullName, email, telephone, cpf, datebirth, address, neighborhood, cep, city, uf, passwordSecurity, isAdm)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data.nameUser,
            hashedPassword,
            data.fullName,
            data.email,
            data.telephone,
            data.cpf,
            data.datebirth,
            data.address,
            data.neighborhood,
            data.cep,
            data.city,
            data.uf,
            hashedPasswordS,
            data.isAdm ? 1 : 0
          ],
          function (err) {
            if (err) {
              return reject(err);
            }
            resolve({ success: true, id: this.lastID });
          }
        );
      });
    } catch (error) {
      throw new Error('Erro ao criar o usuário: ' + error.message);
    }
  }

  // Método para buscar um usuário por nome de usuário
  static findByUsername(nameUser) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE nameUser = ?`, [nameUser], (err, user) => {
        if (err || !user) {
          return reject('Usuário não encontrado.');
        }
        resolve(user);
      });
    });
  }

  // Método para atualizar os campos permitidos do usuário, incluindo a senha
  static async updateUser(id, data) {
    try {
      const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null;

      return new Promise((resolve, reject) => {
        let query = `
              UPDATE users SET
              nameUser = ?,
              telephone = ?,
              address = ?,
              neighborhood = ?,
              cep = ?,
              city = ?,
              uf = ?
            `;
        const params = [
          data.nameUser,
          data.telephone,
          data.address,
          data.neighborhood,
          data.cep,
          data.city,
          data.uf
        ];

        if (hashedPassword) {
          query += `, password = ?`;
          params.push(hashedPassword);
        }

        query += ` WHERE id = ?`;
        params.push(id);

        db.run(query, params, function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ success: true });
        });
      });
    } catch (error) {
      throw new Error('Erro ao atualizar o usuário: ' + error.message);
    }
  }
}

module.exports = User;
