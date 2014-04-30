/**
 * Created by caoyangkaka on 4/29/14.
 */
var cluster = require('cluster');
var http = require('http');

var cpus = 2;

if(cluster.isMaster) {
    console.log('Master process with pid:' + process.pid);
    for(var i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker) {
       console.log('Worker is dead with pid:' + worker.pid);
        cluster.fork();
    });
} else {
    console.log('Child Worker with pid:' + process.pid);
    http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('hello world!\n');
    }).listen(3000, '127.0.0.1');
}