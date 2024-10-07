const { ipcMain } = require('electron');

// Lidar com o login
ipcMain.on('login', (event, loginData) => {
  const { usuario, senha } = loginData;

  // Função de validação de usuário e senha
  const isAuthenticated = autenticarUsuario(usuario, senha);

  if (isAuthenticated) {
    event.reply('login-reply', { success: true });
  } else {
    event.reply('login-reply', { success: false });
  }
});
