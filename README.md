# electron_bilibili
electron Study


## 安装 electron

1. 安装

    `npm install electron --save-dev`

2. hello world

    ``` javascript
        var electron = require('electron');

        var app = electron.app // 引入app
        var BrowserWindow = electron.BrowserWindow; // 用来控制窗口引入

        // 需要打开的主窗口
        var mainWindow = null;

        // 
        app.on('ready', () => {
            mainWindow = new BrowserWindow({
                width: 300, 
                height: 300,
                webPreferences: {
                    nodeIntegration: true
                }
            })
            mainWindow.loadFile("index.html")

            mainWindow.on('closed', () => {
                mainWindow = null;
            })
        })
    ```

3. 启动
    
    **在命令行使用 需要全局安装才能使用 electron . 开启**
    
    `electron .`

## 语法

4. remote

    **基本语法**

    ``` javascript
    const BrowserWindow = require('electron').remote.BrowserWindow
        var newWin = null;

        newWin = new BrowserWindow ({
            width: 500,
            height: 500
        })
        newWin.loadFile('yellow.html')
        newWin.on('closed', () => {
            newWin = null;
        })
    ```

5. 菜单

    **自定义菜单 和 使用**

    ``` javascript
        const {Menu, BrowserWindow} = require('electron')
        // 菜单模版
        var template = [
            {
                label: '朝花夕拾',
                accelerator: 'ctrl+n', // 设置快捷键
                submenu: [
                    {
                        label: '黄山',
                        click: () => {
                            var win = BrowserWindow({
                                ...
                            })
                        }
                    },
                    {lable: '天子'}
                ]
            },
            {
                lable: '青衫磊落少年行',
                submenu: [
                    {lable: '天龙八部'},
                    {lable: '诛仙'}
                ]
            }
        ]

        // 构建模版
        var m = Menu.buildFromTemplate(template);
        // 让菜单变成可用状态
        Menu.setApplicationMenu(m);
    ```

    **使用**

    ``` javascript
        app.on('ready', () => {
                mainWindow = new BrowserWindow({
                width: 300, 
                height: 300
            })
            require('./main/menu');
            ...
        })
        
    ```

    **右键菜单**

    ``` javascript
        const {remote} = require('electron')
        var rightMenuTemplate = [
            {label: '复制', accelerator: 'ctrl+c'},
            {label: '粘贴', accelerator: 'ctrl+v'}
        ]
        var m = remote.Menu.buildFromTemplate(rightMenuTemplate);

        window.addEventListener('contextmenu', function (e){
            

            e.preventDefault();
            m.popup({
                window: remote.getCurrentWindow(m)
            })
        })
    ```

    **在主进程中打开调式**

    `mainWindow.webContents.openDevTools();`

    **在浏览器中打开链接**

    ``` javascript
        var {shell} = require('electron')

        shell.openExternal(href);
    ```

    **内嵌网页**

    ``` javascript
        // 获取BrowserView
        var BrowserView = electron.BrowserView;
        var view = new BrowserView()
        mainWindow.setBrowserView(view)
        view.setBounds({x:0, y:120, width: 800, height: 480})
        view.webContents.loadURL('https://www.baidu.com/')
    ```

7. 窗口

    **子窗口传递数据到父窗口**

    ``` javascript
        window.opener.postMessage("我是子窗口传递过来的信息")
    ```

    **父窗口接收信息**
    ```javascript

        // 接收
        window.addEventListener('message', (msg) => {
            var message = document.querySelector("#message");
            message.innerHTML = JSON.stringify(msg)
        })
    ```

8. 对话框

    **文件选择对话框**

    `dialog.showOpenDialog()`

        它有两个参数，一个是设置基本属性，另一个是回调函数，如果是异步可以使用then来实现

        title ： String (可选)，对话框的标题

        defaultPath ： String (可选),默认打开的路径

        buttonLabel ： String (可选), 确认按钮的自定义标签，当为空时，将使用默认标签

        filters ： 文件选择过滤器，定义后可以对文件扩展名进行筛选
        
        properties：打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件
    
    ``` javascript

        const {dialog} = require('electron').remote
        var openBtn = document.getElementById('openBtn');
        openBtn.onclick = function(){
            dialog.showOpenDialog({
                title: "请选择图片",
                defaultPath: '320.jpg',     // 指定选择框默认路径
                filters: [
                    {name: 'img', extensions: ['jpg', 'png']}
                ],  // 图片过滤器
                buttonLabel: '打开图片' // 打开文件指定按钮文字
            }).then( result => {
                let image = document.getElementById("image");
                console.log(result)
                image.setAttribute("src", result.filePaths[0])
            }).catch( e => {
                console.log(e)
            })
        }
    ```

    **保存对话框**

    `dialog.showSaveDialog()`

    ```javascript
        
        const fs = require('fs')

        dialog.showSaveDialog({
            title: '保存文件',
        }).then( result => {
            console.log(result)
            fs.writeFileSync(result.filePath, 'quadrant26')
        }).catch( err => {
            console.log(err)
        })
    ```

    **消息对话框**

    `showMessageBox`

        常用属性

        type ：String类型，可以选，图标样式，有none、info、error、question和warning

        title: String类型，弹出框的标题
        
        messsage : String 类型，必选 message box 的内容，这个是必须要写的
        
        buttons: 数组类型，在案例中我会详细的讲解，返回的是一个索引数值（下标）

    ```javascript

        dialog.showMessageBox({
            type:'warning',
            title:'去不去由你',
            message:'去吃火锅吗？',
            buttons:['ok','cancel']
        }).then(result=>{
            console.log(result)
        })
    ```

9. 断网提醒

    桌面客户端的程序都必备的一个功能是判断网络状态，这个其实可以用window.addEventListener来进行时间监听。

    ```javascript
        window.addEventListener('online',function(){
            alert('网络回来了，我们继续哦！')
        })

        window.addEventListener('offline',function(){
            alert('网络好像断开了，请稍等！')
        })
    ```

10. 通知消息

    `window.Notification`

    ```javascript
        var option = {
            title: '小二，来订单了，出来接客了',
            body: '有新订单了'
        }

        new window.Notification(option.title, option)
    ```

11. 注册全局快捷键

    **globalShortcut**

    globalShortcut是主进程中的模块，而且注册的都是全局的快捷键，所以你尽量写在main.js中。打开main.js，然后先引入globalShortcut

    ```javascript
        var  globalShortcut = electron.globalShortcut

        globalShortcut.register('ctrl+e',()=>{
            mainWindow.loadURL('http://www.baidu.com/')  
        })
        
    ```

    **检测快捷键是否注册成功**

    ```javascript
         let isRegister= globalShortcut.isRegistered('ctrl+e')?'Register Success':'Register fail'
        console.log('------->'+isRegister)
    ```

    **注销快捷键**

    ```javascript
        app.on('will-quit',function(){
        //注销全局快捷键的监听
            globalShortcut.unregister('ctrl+e')
            globalShortcut.unregisterAll()
        })
    ```

12. 剪贴板

    ```javascript
        const {clipboard} = require('electron')

        const code = document.getElementById('code')
        const btn = document.getElementById('btn')
        btn.onclick = function(){
            clipboard.writeText(code.innerHTML)
            alert('复制成功')
        }
    ```

13. 打包

    **electron-package**

    安装

    `npm install electron-packager --save-dev`

    **第一种方式**

        electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>

        location of project : 项目所在路径

        name of project : 打包的项目名称

        platform : 确定了你要构建哪个平台的应用（Windows、Mac还是Liux）

        architecture: 决定了使用x86还是x64还是两个架构都需要

        electron version: electron 的版本

        optional options: 可选选项

    **第二种方式**

        打开package.json文件，在scripts下添加代码

    `"packager": "electron-packager ./ HelloWorld --all --out ./outApp  --overwrite --icon=./app/img/icon/icon.ico"`