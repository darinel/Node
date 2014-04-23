/**
 * Created by caoyangkaka on 4/22/14.
 */
var connect = require('connect');

var app = connect().use(connect.basicAuth('tobi', 'ferret'))
                   .use(function(req, res) {
                        res.end('Secret');
    }).listen(3000);