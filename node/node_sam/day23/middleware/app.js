/**
 * Created by caoyangkaka on 4/30/14.
 */
var http =require('http');
var connect = require('connect');

var ips = ['127.0.0.2'];

var app = connect()
    .use(ipfilter(ips))
    .use(helloworld);

function ipfilter(ips) {
    var ips = ips || [];
    return function(req, res, next) {
        console.log(req.connection.remoteAddress);
        if(ips.indexOf(req.connection.remoteAddress) == -1) {
            res.writeHead(401, {'Content-Type': 'text/plain'});
            res.end('Your IP is banned.');
        }else {
            next();
        }
    };
}

function helloworld(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hi, hello world');
};

http.Server(app).listen(3000);