/**
 * Created by caoyangkaka on 4/29/14.
 */
var http = require('http'), fs = require('fs');

http.createServer(function(req, res) {
    var pdf = __dirname + '/junit_tutorial.pdf';
    var stat = fs.statSync(pdf);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(pdf);
    readStream.pipe(res);
}).listen(3000, '127.0.0.1');