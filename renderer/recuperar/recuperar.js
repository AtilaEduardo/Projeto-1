const { ipcRenderer } = require('electron');

// Enviar e-mail de recuperação para o backend
document.getElementById('recuperar-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  ipcRenderer.send('recuperar-senha', { email });
});

// Receber resposta do backend
ipcRenderer.on('recuperar-senha-reply', (event, response) => {
  if (response.success) {
    alert('E-mail enviado com instruções para redefinir a senha.');
  } else {
    alert('Erro: ' + response.error);
  }
});
