const User = require('../models/User');
const bcrypt = require('bcrypt');

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
      passwordSecurity,
      isAdm
    } = req.body;

    try {
      const user = await User.create({
        nameUser,
        password,
        fullName,
        email,
        telephone,
        cpf,
        datebirth,
        address,
        neighborhood,
        cep,
        city,
        uf,
        passwordSecurity,
        isAdm
      });

      res.send({ success: true, message: 'Usuário criado com sucesso!', userId: user.id });
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      res.status(500).send({ success: false, message: 'Erro ao criar o usuário.' });
    }
  }

  static async login(req, res) {
    const { nameUser, password } = req.body;

    try {
        const user = await User.findByUsername(nameUser);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: 'Senha incorreta.' });
        }

        // Atribui o userId à sessão
        req.session.userId = user.id;

        res.send({ success: true, message: 'Login bem-sucedido.', isAdm: user.isAdm });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).send({ success: false, message: 'Erro ao processar o login.' });
    }
}

  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      nameUser,
      telephone,
      address,
      neighborhood,
      cep,
      city,
      uf,
      password
    } = req.body;

    try {
      await User.updateUser(id, {
        nameUser,
        telephone,
        address,
        neighborhood,
        cep,
        city,
        uf,
        password
      });

      res.send({ success: true, message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      res.status(500).send({ success: false, message: 'Erro ao atualizar o usuário.' });
    }
  }
}

module.exports = UserController;
