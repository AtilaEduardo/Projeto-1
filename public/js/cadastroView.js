// Função para aplicar máscara de CPF
function mascaraCPF(cpfInput) {
    let cpf = cpfInput.value.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    cpfInput.value = cpf;
  }
  
  // Função para aplicar máscara de CNPJ
  function MascaraParaLabel(cnpjInput) {
    let cnpj = cnpjInput.value.replace(/\D/g, '');
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    cnpjInput.value = cnpj;
  }
  