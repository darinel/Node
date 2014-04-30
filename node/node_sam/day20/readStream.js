/**
 * Created by caoyangkaka on 4/29/14.
 */
var fs = require('fs');

var stream = fs.ReadStream(__dirname + '/latin.txt');

stream.on('data', function(data) {
    console.log('Data received.');
});

stream.on('close', function() {
    console.log('Read Finished.');
});
