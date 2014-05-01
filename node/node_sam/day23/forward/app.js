/**
 * Created by caoyangkaka on 4/30/14.
 */
var connect = require('connect'),
    http = require('http');

var app = connect()
    .use(forceDomain('127.0.0.1:3000'))
    .use(helloWorld)

function forceDomain(domain){
    domain = domain || false;

    return function (req, res, next){
        for(var item in req.headers) {
            console.log(item + ": " + req.headers[item]);
        }
        if (domain && (req.headers.host != domain)){
            res.writeHead(301, {"Location": 'http://' + domain + req.url});
            res.end();
        } else {
            next();
        }
    };
};

function helloWorld(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}

http.Server(app).listen(3000);