const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');

class User {
  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedPasswordS = await bcrypt.hash(data.password_security, 10);
    return knex('users').insert({
      nameUser: data.nameUser,
      password: hashedPassword,
      fullName: data.fullName,
      email: data.email,
      date_birth: data.date_birth,
      cpf: data.cpf,
      address: data.address,
      neighborhood: data.neighborhood,
      cep: data.cep,
      city: data.city,
      uf: data.uf,
      password_security: hashedPasswordS,
      is_admin: data.is_admin ? 1 : 0
    });
  }

  static async findByEmail(nameUser) {
    return knex('users').where({ nameUser }).first();
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return knex('users').where({ id }).update({ password: hashedPassword });
  }
}

module.exports = User;
