// Enviar dados do login para o backend
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
  
    // Enviar dados ao backend
    ipcRenderer.send('login', { usuario, senha });
  });
  
  // Receber resposta do backend e redirecionar se login for bem-sucedido
  ipcRenderer.on('login-reply', (event, response) => {
    if (response.success) {
      window.location = '../Home/home.html';  // Redirecionar para a página principal
    } else {
      alert('Usuário ou senha inválidos!');
    }
  });
  
  // Links para outras funcionalidades
  document.getElementById('recuperar-senha').addEventListener('click', () => {
    window.location = 'recuperar.html';
  });
  
  document.getElementById('criar-conta').addEventListener('click', () => {
    window.location = 'cadastro.html';
  });
  