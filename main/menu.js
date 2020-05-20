const {Menu, BrowserWindow} = require('electron')

var template = [
    {
        label: '朝花夕拾',
        submenu: [
            {
                label: '黄山',
                accelerator: 'ctrl+n',
                click: () => {
                    var win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: {
                            nodeIntegration: true
                        }
                    })
                    win.loadFile('yellow.html')
                    win.on('closed', () => {
                        win = null;
                    })
                }
            },
            {label: '天子'}
        ]
    },
    {
        label: '青衫磊落少年行',
        submenu: [
            {label: '天龙八部'},
            {label: '诛仙'}
        ]
    }
]

// 构建模版
var m = Menu.buildFromTemplate(template);
// 让菜单变成可用状态
Menu.setApplicationMenu(m);