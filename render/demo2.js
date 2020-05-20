const btn = this.document.querySelector("#btn");

const BrowserWindow = require('electron').remote.BrowserWindow
var newWin = null;

window.onload = function (){
    btn.onclick = function (){
        newWin = new BrowserWindow ({
            width: 500,
            height: 500
        })
        newWin.loadFile('yellow.html')
        newWin.on('closed', () => {
            newWin = null;
        })
    }
}