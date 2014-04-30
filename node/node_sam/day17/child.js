/**
 * Created by caoyangkaka on 4/29/14.
 */
var fs = require('fs');
process.on('message', function(message) {
    console.log('Child Process got message:', message);
});
var m = '';
fs.readFile(__dirname + '/file.txt','utf-8', function (err, data) {
    if (err) {
        console.log('error');
        throw err;
    }
    process.send({message: data});
});
