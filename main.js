var electron = require('electron');

var app = electron.app // 引入app
var BrowserWindow = electron.BrowserWindow; // 用来控制窗口引入
// 注册全局快捷键
var globalShortcut = electron.globalShortcut;

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

    // 打开调试模式
    mainWindow.webContents.openDevTools();

    // 注册快捷键
    globalShortcut.register('ctrl+e', () => {
        mainWindow.loadURL('https://www.baidu.com/')
    })
    // 查看快捷键是否注册成功
    let isRegister = globalShortcut.isRegistered('ctrl+e') ? 'Regsiter Success' : 'Register fail';
    console.log('---->' + isRegister)

    // 注销全局快捷键


    require('./main/menu');

    // 获取BrowserView
    /*
    var BrowserView = electron.BrowserView;
    var view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({x:0, y:120, width: 800, height: 480})
    view.webContents.loadURL('https://www.baidu.com/')
    */

    mainWindow.loadFile("demo7.html")

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})

//注销全局快捷键的监听
app.on('will-quit', function (){
    globalShortcut.unregister('ctrl+e');
    globalShortcut.unregisterAll();
})