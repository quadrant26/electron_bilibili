var {shell} = require('electron')

var ctn = document.querySelector("#ctn");
var childopen = document.querySelector("#childopen");

ctn.onclick = function (e){

    e.preventDefault();
    
    var href = this.getAttribute("href");
    shell.openExternal(href);
}

childopen.onclick = function (){
    window.open('./popup_page.html')
}

// 接收
window.addEventListener('message', (msg) => {
    var message = document.querySelector("#message");
    message.innerHTML = JSON.stringify(msg)
})