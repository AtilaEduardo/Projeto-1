const bcrypt = require('bcrypt');
const db = require('../database/database');  // Ajuste do caminho se necessário

class UserController {
  static async createUser(req, res) {
    const {
      nameUser,
      password,
      fullName,
      email,
      telephone,
      datebirth,
      cpf,
      address,
      neighborhood,
      cep,
      city,
      uf,
      passwordSecurity
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha principal
      const hashedPasswordS = await bcrypt.hash(passwordSecurity, 10); // Hash da senha de segurança

      db.run(
        `INSERT INTO users (nameUser, password, fullName, email, telephone, cpf, datebirth, address, neighborhood, cep, city, uf, passwordSecurity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nameUser, hashedPassword, fullName, email, telephone, datebirth, cpf, address, neighborhood, cep, city, uf, hashedPasswordS],
        function (err) {
          if (err) {
            return res.status(500).send({ success: false, message: 'Erro ao criar o usuário.' });
          }
          res.send({ success: true, message: 'Usuário criado com sucesso!' });
        }
      );
    } catch (error) {
      res.status(500).send({ success: false, message: 'Erro ao criar o usuário.' });
    }
  }

  static login(req, res) {
    const { nameUser, password } = req.body;

    db.get(`SELECT * FROM users WHERE nameUser = ?`, [nameUser], async (err, user) => {
      if (err || !user) {
        return res.status(400).send({ success: false, message: 'Usuário não encontrado.' });
      }

      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).send({ success: false, message: 'Senha incorreta.' });
        }

        // Armazena o userId na sessão após o login bem-sucedido
        req.session.userId = user.id;
        res.send({ success: true, message: 'Login bem-sucedido.' });
      } catch (error) {
        res.status(500).send({ success: false, message: 'Erro ao processar o login.' });
      }
    });
  }
}

module.exports = UserController;
