/**
 * Created by caoyangkaka on 4/29/14.
 */
var spawn =require('child_process').spawn;
var ping = spawn('ping', ['wwww.baidu.com']);

ping.stdout.setEncoding('utf8');

ping.stdout.on('data', function(chunk) {
    console.log(chunk);
});

ping.on('exit', function(code, signal) {
    console.log('Child process was killed by a ' + signal);
});

setTimeout(function() {
    ping.kill();
}, 10000);
