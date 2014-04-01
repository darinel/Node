/**
 * Created by caoyangkaka on 3/31/14.
 */
var net = require('net');

var server = net.createServer(function(socket) {
    socket.once ('data', function(data) {
        socket.write(data);
    });
});
server.listen(8888);