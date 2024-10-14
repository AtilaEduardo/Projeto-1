// Função para cadastrar produto
const form = document.getElementById('productForm');
if (!form) {
    console.log('Formulário não encontrado!');
} else {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Previne o comportamento padrão do formulário
    
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('amount', document.getElementById('amount').value);
        formData.append('category', document.getElementById('category').value);
        formData.append('image', document.getElementById('image').files[0]);
    
  
        const offersChecked = document.getElementById('offers').checked ? 1 : 0;
        const couponsChecked = document.getElementById('coupons').checked ? 1 : 0;
        formData.append('offers', offersChecked);
        formData.append('coupons', couponsChecked);
    
        try {
            const response = await fetch('http://localhost:3001/products', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
    
            const result = await response.json();
            if (result.success) {
                alert('Produto cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar produto: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor.');
        }
    });
}

// Função para gerar gráficos de vendas
function renderSalesCharts() {
    const dailySalesCtx = document.getElementById('dailySalesChart').getContext('2d');
    const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');

    const dailySalesData = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Vendas Diárias',
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const monthlySalesData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Vendas Mensais',
            data: [120, 190, 300, 500, 200, 300, 100, 400, 300, 450, 600, 700],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    new Chart(dailySalesCtx, {
        type: 'bar',
        data: dailySalesData
    });

    new Chart(monthlySalesCtx, {
        type: 'line',
        data: monthlySalesData
    });
}

// Renderiza os gráficos quando a página é carregada
window.onload = renderSalesCharts;
