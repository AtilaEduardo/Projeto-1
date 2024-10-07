const { ipcRenderer } = require('electron');

// Enviar dados do cadastro para o backend
document.getElementById('cadastro-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nome            = document.getElementById('nome').value;
  const usuario         = document.getElementById('usuario').value;
  const senha           = document.getElementById('senha').value;
  const email           = document.getElementById('email').value;
  const data_nascimento = document.getElementById('data_nascimento').value;
  let cpf               = document.getElementById('cpf').value; // CPF com máscara
  const razao_social    = document.getElementById('razao_social').value;
  let cnpj              = document.getElementById('cnpj').value; // CNPJ com máscara
  const endereco        = document.getElementById('endereco').value;
  const senha_seguranca = document.getElementById('senha_seguranca').value;
  const is_cpf_cnpj     = document.getElementById('is_cpf_cnpj').value; // Verifique se isso está sendo preenchido corretamente

  // Validações básicas
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  if (senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (is_cpf_cnpj == 1) {
    if (!razao_social || !usuario || !senha || !email || !senha_seguranca || !cnpj || !endereco) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    if (cnpj.length !== 14 || !validarCNPJ(cnpj)) {
      alert('O CNPJ é inválido.');
      return;
    }

    // Enviar dados de cadastro com CNPJ
    ipcRenderer.send('cadastro', { razao_social, usuario, senha, email, senha_seguranca, cnpj, endereco });
  
  } else {
    if (!nome || !usuario || !senha || !email || !senha_seguranca || !data_nascimento || !cpf || !endereco) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    if (cpf.length !== 11 || !validarCPF(cpf)) {
      alert('O CPF é inválido.');
      return;
    }

    // Enviar dados de cadastro com CPF
    ipcRenderer.send('cadastro', { nome, usuario, senha, email, senha_seguranca, data_nascimento, cpf, endereco });
  }
});

// Receber resposta do backend
ipcRenderer.on('cadastro-reply', (event, response) => {
  if (response.success) {
    window.location = '../Home/home.html';  // Redirecionar para a página inicial
  } else {
    alert('Erro ao cadastrar: ' + response.error);
  }
});

// Funções de validação de CPF e CNPJ
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); 
  if (cpf.length !== 11) return false;
  let soma = 0, resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if (cnpj.length !== 14) return false;
  let tamanho = cnpj.length - 2, numeros = cnpj.substring(0,tamanho), digitos = cnpj.substring(tamanho);
  
  let soma = 0, pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) return false;

  tamanho += 1, numeros = cnpj.substring(0,tamanho), soma = 0, pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado == digitos.charAt(1);
}