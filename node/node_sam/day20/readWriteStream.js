/**
 * Created by caoyangkaka on 4/29/14.
 */
var fs = require('fs');
var stream = fs.ReadStream(__dirname + '/latin.txt');
var outStream = fs.WriteStream(__dirname + '/out.txt');

stream.setEncoding('utf8');
stream.on('data', function(data) {
    outStream.write(data);
})

stream.on('close', function() {
    outStream.end();
    console.log('End of read and write in stream.');
})

//stream.pipe(outStream);