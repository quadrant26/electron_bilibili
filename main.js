var electron = require('electron');

var app = electron.app // 引入app
var BrowserWindow = electron.BrowserWindow; // 用来控制窗口引入

// 需要打开的主窗口
var mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 900, 
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.webContents.openDevTools();

    require('./main/menu');

    mainWindow.loadFile("demo3.html")

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})