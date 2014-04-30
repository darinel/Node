/**
 * Created by caoyangkaka on 4/29/14.
 */
var http = require('http');

http.createServer(function(req, res) {
    var options = {
        host: '127.0.0.1',
        port: '3000'
    };
    http.get(options, function(response) {
        //var length = response.getHeader('content-length');
        res.writeHead(200, {
            'Content-Type': 'application/pdf'
        });
        response.pipe(res);
    });

}).listen(3010, '127.0.0.1');