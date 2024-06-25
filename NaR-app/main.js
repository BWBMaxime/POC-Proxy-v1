const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: './NaR-app/img/logo-rond.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Vérifiez que ce chemin est correct
      nodeIntegration: false, // Assurez-vous que cela est false pour des raisons de sécurité
      contextIsolation: true,
    }
  });

  win.loadFile('./NaR-app/index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
