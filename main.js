var electron = require('electron');

var app = electron.app // 引入app
var BrowserWindow = electron.BrowserWindow; // 用来控制窗口引入

// 需要打开的主窗口
var mainWindow = null;