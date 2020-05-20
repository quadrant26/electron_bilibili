var fs = require('fs');

window.onload = function (){
    var btn = this.document.querySelector("#btn");
    var data = this.document.querySelector("#data");

    btn.onclick = function (){
        fs.readFile('xiao.txt', (err, cdata) => {
            data.innerHTML = cdata;
        })
    }
}