const nodemailer = require('nodemailer');
const db = require('./database');

async function enviarEmailRecuperacao(email) {
  try {
    // Verificar se o e-mail existe no banco de dados
    const usuario = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuario.length === 0) {
      return { success: false, error: 'E-mail não encontrado.' };
    }

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // ou outro serviço de e-mail
      auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha'
      }
    });

    // Conteúdo do e-mail
    const mailOptions = {
      from: 'seu-email@gmail.com',
      to: email,
      subject: 'Recuperação de Senha',
      text: 'Aqui está o link para redefinir sua senha: http://seuapp.com/redefinir-senha'
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar e-mail de recuperação:', error);
    return { success: false, error: 'Erro ao enviar o e-mail de recuperação.' };
  }
}

module.exports = { enviarEmailRecuperacao };
