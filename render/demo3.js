var {shell} = require('electron')

var ctn = document.querySelector("#ctn");

ctn.onclick = function (e){

    e.preventDefault();
    
    var href = this.getAttribute("href");
    shell.openExternal(href);
}