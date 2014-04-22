/**
 * Created by caoyangkaka on 4/21/14.
 */
var path = '/users/:id';
var n = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
var re = new RegExp('^' + n + '$');
console.log(re);