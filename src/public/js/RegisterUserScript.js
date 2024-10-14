// Chave de administrador válida no frontend
const ADMIN_PASSWORD = "12345";

function toggleAdminPassword() {
    const isAdm = document.getElementById('isAdm').checked;
    document.getElementById('adminPasswordSection').style.display = isAdm ? 'block' : 'none';
}

// Validação no envio do formulário
document.getElementById('registerForm').addEventListener('submit', function (event) {
    const isAdm = document.getElementById('isAdm').checked;

    // Se o usuário marcou a opção de administrador, valida a chave
    if (isAdm) {
        const adminPassword = document.getElementById('adminPassword').value;

        // Verifica se a chave está correta
        if (adminPassword !== ADMIN_PASSWORD) {
            event.preventDefault();  // Impede o envio do formulário
            alert('Chave de confirmação de administrador inválida.');
            return false;
        }
    }
});

const form = document.getElementById('registerForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        nameUser: formData.get('nameUser'),
        password: formData.get('password'),
        passwordSecurity: formData.get('passwordSecurity'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        datebirth: formData.get('datebirth'),
        cpf: formData.get('cpf'),
        address: formData.get('address'),
        neighborhood: formData.get('neighborhood'),
        cep: formData.get('cep'),
        city: formData.get('city'),
        uf: formData.get('uf'),
        isAdm: document.getElementById('isAdm').checked ? 1 : 0
    };

    console.log('Dados a serem enviados:', data);  // Log para verificar os dados capturados

    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao registrar: ' + result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
    }
});
