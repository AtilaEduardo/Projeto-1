const { ipcRenderer } = require('electron');

// Obter lista de produtos
ipcRenderer.send('get-produtos');

ipcRenderer.on('get-produtos-reply', (event, produtos) => {
  const lista = document.getElementById('produtos-lista');
  lista.innerHTML = ''; // Limpa a lista para evitar duplicação
  produtos.forEach(produto => {
    const item = document.createElement('li');
    item.textContent = `${produto.nome} - R$ ${produto.preco}`;
    lista.appendChild(item);
  });
});

// Adicionar novo produto
document.getElementById('produto-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = document.getElementById('preco').value;
  const estoque = document.getElementById('estoque').value;

  ipcRenderer.send('add-produto', { nome, descricao, preco, estoque, usuario_idusuario: 1 });

  ipcRenderer.on('add-produto-reply', (event, response) => {
    alert(response.success || response.error);
  });
});
