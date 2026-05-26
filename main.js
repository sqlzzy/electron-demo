const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let loginWindow = null;
let mainWindow = null;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        resizable: false,
        title: 'Авторизация',
    });

    loginWindow.loadFile('login.html');
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        title: 'Главное приложение',
        show: false,
    });

    mainWindow.loadFile('main-window.html');
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.handle('auth:login', async (event, { username, password }) => {
    const validUsername = 'admin';
    const validPassword = '123';
    
    if (username === validUsername && password === validPassword) {
        if (loginWindow) {
            loginWindow.close();
        }
        createMainWindow();
        return { success: true };
    } else {
        return { success: false, message: 'Неверное имя пользователя или пароль' };
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createLoginWindow();
    }
});

app.whenReady().then(() => {
    createLoginWindow();
});