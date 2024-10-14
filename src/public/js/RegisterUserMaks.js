function mascaraCPF(cpfInput) {
    let cpf = cpfInput.value.replace(/\D/g, ''); 
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');   
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');   
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    cpfInput.value = cpf; 
}

function validarCPF(cpfInput) {
    const cpf = cpfInput.value.replace(/\D/g, ''); 
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        alert("CPF inválido");
        return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        alert("CPF inválido");
        return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        alert("CPF inválido");
        return false;
    }
    return true;
}

function mascaraTelefone(telefoneInput) {
    let telefone = telefoneInput.value.replace(/\D/g, ''); 
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    telefoneInput.value = telefone;
}

function mascaraCEP(cepInput) {
    let cep = cepInput.value.replace(/\D/g, ''); 
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    cepInput.value = cep; 
}

function validarEmail(emailInput) {
    const email = emailInput.value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        alert("E-mail inválido");
    }
}

// Função para validar se o usuário tem pelo menos 18 anos
function validarIdade(dataNascimentoInput) {
    const hoje = new Date();
    const dataNascimento = new Date(dataNascimentoInput.value);
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    
    if (idade < 18) {
        alert("Você deve ter pelo menos 18 anos para se registrar.");
        return false;
    }
    return true;
}

document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('neighborhood').value = data.bairro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('uf').value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP.');
            });
    } else {
        alert('CEP inválido');
    }
});
