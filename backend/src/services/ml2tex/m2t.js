var fs = require('fs');
var exec = require('child_process').exec;
var tmp = require('tmp');
var he = require('he');


function mml2tex(htmlIn) {
    var texOut
    htmlFixed = htmlIn.replace(/&laquo/g, "&lt").replace(/&raquo/g, "&gt").replace(/&uml/g, "&quot")
    htmlDecode = he.decode(htmlFixed)
    return new Promise((resolve, reject) => {
        tmp.file({
            mode: 0o644,
            postfix: '.xml'
        }, function _tempFileCreated(err, path, fd) {
            if (err) return reject(err);

            fs.writeFile(path, htmlDecode, (err) => {
                if (err) return reject(err);
            });
            var convertCmd = `java -jar saxon9he.jar -s:${path} -xsl:mml2tex/xsl/invoke-mml2tex.xsl`;

            exec(convertCmd, function (err, stdout, stderr) {
                if (err) return reject(err);
                texOut = stdout.split("mml2tex ").pop().split("?")[0]; //Latex Output
                resolve(texOut)

            });
        });
    });
}



