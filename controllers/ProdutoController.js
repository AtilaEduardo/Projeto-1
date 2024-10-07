const { ipcMain } = require('electron');
const Produto = require('../models/Produto');

// Obter produtos
ipcMain.on('get-produtos', (event) => {
  // Aqui você faria uma consulta no banco de dados
  Produto.getAll()
    .then(produtos => {
      event.reply('get-produtos-reply', produtos);
    })
    .catch(error => {
      event.reply('get-produtos-reply', { error: 'Erro ao obter produtos' });
    });
});

// Adicionar novo produto
ipcMain.on('add-produto', (event, novoProduto) => {
  // Aqui você faria a inserção no banco de dados
  Produto.add(novoProduto)
    .then(() => {
      event.reply('add-produto-reply', { success: 'Produto adicionado com sucesso!' });
    })
    .catch(error => {
      event.reply('add-produto-reply', { error: 'Erro ao adicionar produto' });
    });
});
