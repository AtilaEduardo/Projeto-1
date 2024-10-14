
// Função para buscar as solicitações de suporte
async function fetchSupportRequests() {
    const response = await fetch('/support');
    const data = await response.json();
    const tableBody = document.querySelector("#supportRequestsTable tbody");

    // Limpa a tabela antes de adicionar novas linhas
    tableBody.innerHTML = '';

    // Adiciona cada solicitação na tabela
    data.supportRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.user_name}</td>
            <td>${request.user_email}</td>
            <td>${request.support_type}</td>
            <td>${request.description}</td>
            <td>${request.status}</td>
            <td>
                ${request.status === 'open' ? `<button onclick="startSupport(${request.id})">Iniciar Atendimento</button>` : 'Atendimento Iniciado'}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para iniciar o atendimento
async function startSupport(id) {
    const response = await fetch('/support', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status: 'in progress' })
    });

    if (response.ok) {
        alert('Atendimento iniciado com sucesso.');
        fetchSupportRequests();  // Atualiza a lista de solicitações
    } else {
        alert('Erro ao iniciar atendimento.');
    }
}

// Carregar as solicitações ao abrir a página
document.addEventListener('DOMContentLoaded', fetchSupportRequests);
