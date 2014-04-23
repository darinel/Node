/**
 * Created by caoyangkaka on 4/22/14.
 */
var connect = require('connect');

var app = connect().use(connect.cookieParser('My name is Matty'))
         .use(function(req, res) {
    console.log(req.cookies);
    console.log(req.signedCookies);
}).listen(3000);