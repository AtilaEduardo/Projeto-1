const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Produto = require('./models/Produto'); // Corrigir o caminho para seu Model

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Certifique-se que esteja desativado o isolamento
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'views', 'Home', 'home.html'));
}

// Lida com paginação de produtos
ipcMain.on('get-produtos', (event, page) => {
  const itemsPerPage = 3; // Define quantos itens por página
  Produto.getProductsByPage(page, itemsPerPage)
    .then(produtos => {
      event.reply('get-produtos-reply', produtos);
    })
    .catch(error => {
      event.reply('get-produtos-reply', { error: 'Erro ao obter produtos' });
    });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
