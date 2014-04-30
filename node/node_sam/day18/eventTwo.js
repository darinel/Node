/**
 * Created by caoyangkaka on 4/29/14.
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('message', function(data) {
    console.log(data);
    setTimeout(function() {

    }, 10000);
})

event.emit('message', 'This is a secret message.');

event.on('bang', function(data) {
    console.log(data);
})

setTimeout(function() {
    event.emit('bang', 'Bang Bang')
}, 1000);
