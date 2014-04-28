/**
 * Created by caoyangkaka on 4/27/14.
 */
var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);
var nicknames = [];

server.listen(3000);

console.log(__dirname);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('nickname', function (data, callback) {
        if(nicknames.indexOf(data) != -1) {
            callback(false);
        }else {
            callback(true);
            nicknames.push(data);
            socket.nickname = data;
            console.log('&&&&&The data received the following the client with the nickname:' + data);
            socket.emit('nicknames', nicknames);
        }
    });
    socket.on('disconnect', function() {
        if(!socket.nickname) return;
        if(nicknames.indexOf(socket.nickname) > -1) {
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        }
        console.log('&&&&&The nickname are:' + nicknames);
    });
});