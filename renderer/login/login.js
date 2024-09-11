const { ipcRenderer } = require('electron');

// Enviar dados do login para o backend
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  ipcRenderer.send('login', { usuario, senha });
});

// Receber resposta do backend
ipcRenderer.on('login-reply', (event, response) => {
  if (response.success) {
    window.location = '../home/home.html';  // Redirecionar para a página principal (home)
  } else {
    alert('Erro: ' + response.error);  // Exibir mensagem de erro
  }
});
