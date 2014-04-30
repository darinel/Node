/**
 * Created by caoyangkaka on 4/29/14.
 */
var fs = require('fs');

fs.readFile('file.txt','utf-8', function(err, data) {
    if(err) throw err;
    console.log(data);
});

var buffer = new Buffer('Alot of people');
console.log(buffer.toString('utf8'));

var b = new Buffer(8);
console.log(b.write('a', 'utf8'));