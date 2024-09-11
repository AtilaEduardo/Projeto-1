const { ipcRenderer } = require('electron');

// Enviar dados do cadastro para o backend
document.getElementById('cadastro-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Coletando os valores dos campos
  const nome = document.getElementById('nome').value;
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const email = document.getElementById('email').value;
  const senhaS = document.getElementById('senhaS').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  let cpf = document.getElementById('cpf').value;  // CPF com máscara
  const endereco = document.getElementById('endereco').value;

  // Validações básicas
  if (!nome || !usuario || !senha || !email || !senhaS || !dataNascimento || !cpf || !endereco) {
    alert('Todos os campos são obrigatórios!');
    return;
  }

  // Validação de e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  // Remover a máscara do CPF antes de validar
  cpf = cpf.replace(/\D/g, '');  // Remove qualquer caractere que não seja número

  // Validação de CPF (simples)
  if (cpf.length !== 11 || !validarCPF(cpf)) {
    alert('O CPF é inválido.');
    return;
  }

  // Validação de senha
  if (senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  // Se todas as validações passarem, enviar os dados para o backend
  ipcRenderer.send('cadastro', { nome, usuario, senha, email, senhaS, dataNascimento, cpf, endereco });
});

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length !== 11) return false;

  let soma = 0;
  let resto;
  
  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

function mascaraCPF(cpfInput) {
  let cpf = cpfInput.value;

  // Remove qualquer caractere que não seja número
  cpf = cpf.replace(/\D/g, '');

  // Aplica a máscara de CPF (###.###.###-##)
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Atualiza o valor do input
  cpfInput.value = cpf;
}
