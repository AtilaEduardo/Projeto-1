const { ipcMain } = require('electron');
const { enviarEmailRecuperacao } = require('../models/emailModel');

// Lidar com a solicitação de recuperação de senha
ipcMain.on('recuperar-senha', async (event, { email }) => {
  try {
    const resultado = await enviarEmailRecuperacao(email);

    if (resultado.success) {
      event.reply('recuperar-senha-reply', { success: true });
    } else {
      event.reply('recuperar-senha-reply', { success: false, error: resultado.error });
    }
  } catch (error) {
    event.reply('recuperar-senha-reply', { success: false, error: 'Erro ao processar a solicitação.' });
  }
});
