// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProdutos: () => ipcRenderer.invoke('get-produtos'),
  addProduto: (produto) => ipcRenderer.send('add-produto', produto),
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  cadastro: (novoUsuario) => ipcRenderer.send('cadastro', novoUsuario),
  recuperarSenha: (email) => ipcRenderer.invoke('recuperar-senha', { email })
});
