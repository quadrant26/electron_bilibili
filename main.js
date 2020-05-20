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

    // 获取BrowserView
    var BrowserView = electron.BrowserView;
    var view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({x:0, y:120, width: 800, height: 480})
    view.webContents.loadURL('https://www.baidu.com/')

    mainWindow.loadFile("demo3.html")

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})