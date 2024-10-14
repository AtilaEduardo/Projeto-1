const form = document.getElementById('login-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameUser = document.getElementById('nameUser').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nameUser, password }),
        });

        const result = await response.json();
        console.log('Resposta do servidor:', result); 
        if (result.success) {
            alert('Login bem-sucedido!');
                window.location.href = 'home.html';
        } else {
            alert('Login inválido: ' + result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na conexão com o servidor.');
    }
});
