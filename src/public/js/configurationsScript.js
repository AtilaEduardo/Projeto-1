document.getElementById('userConfigForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const userId = document.getElementById('userId').value;  // Captura o ID do usuário
    formData.append('nameUser', document.getElementById('nameUser').value);
    formData.append('telephone', document.getElementById('telephone').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('cep', document.getElementById('cep').value);
    formData.append('neighborhood', document.getElementById('neighborhood').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('uf', document.getElementById('uf').value);

    const password = document.getElementById('password').value;
    if (password) {
        formData.append('password', password);
    }

    try {
        const response = await fetch(`/updateUser/${userId}`, { 
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();
        if (result.success) {
            alert('Dados atualizados com sucesso!');
        } else {
            alert('Erro ao atualizar dados: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
