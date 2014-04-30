/**
 * Created by caoyangkaka on 4/29/14.
 */
var fork = require('child_process').fork;
var child = fork(__dirname + '/child.js');

child.on('message', function(data) {
    console.log('Parent got a message from child:', data);
})

child.send({m: 'Hello child!'});

