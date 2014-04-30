/**
 * Created by caoyangkaka on 4/29/14.
 */
var buffer = new Buffer(8);

buffer.write('hi', 'utf8');
console.log(buffer.toString());
buffer.write('there', 'utf8');
console.log(buffer.toString());


buffer.write('hi', 'utf8');
console.log(buffer.toString());
buffer.write('there', 2, 'utf8');
console.log(buffer.toString());

var buffer1 = new Buffer(8);
buffer1.write('12345678', 'utf8');
console.log(buffer1.toString());

var string = buffer1.toString();
string = string.replace('1','2');
console.log(string);
buffer1.write(string, 'utf8');
console.log(buffer1.toString());