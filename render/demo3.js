var {shell} = require('electron')

var ctn = document.querySelector("#ctn");
var childopen = document.querySelector("#childopen");

ctn.onclick = function (e){

    e.preventDefault();
    
    var href = this.getAttribute("href");
    shell.openExternal(href);
}

childopen.onclick = function (){
    window.open('https://www.baidu.com/')
}