// Função para lidar com o envio do formulário
document.getElementById('supportForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Coletando os dados do formulário
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const supportType = document.getElementById('supportType').value;
    const description = document.getElementById('description').value;

    // Preparando o objeto de dados para enviar
    const supportData = {
        userName,
        userEmail,
        supportType,
        description
    };

    try {
        // Enviando os dados para o backend
        const response = await fetch('/support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(supportData)
        });

        // Verificando a resposta do backend
        const result = await response.json();

        if (response.ok) {
            alert('Solicitação enviada com sucesso!');
            document.getElementById('supportForm').reset(); // Reseta o formulário
        } else {
            alert('Erro ao enviar solicitação: ' + result.message);
        }
    } catch (error) {
        alert('Erro ao enviar solicitação: ' + error.message);
    }
});