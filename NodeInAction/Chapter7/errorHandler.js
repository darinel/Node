/**
 * Created by caoyangkaka on 4/22/14.
 */
var connect = require('connect');

var app = connect().use(connect.basicAuth('tobi', 'ferret'))
    .use(connect.logger('dev'))
    .use(function(req, res, next) {
        setTimeout(function() {
            next(new Error('throw an error!')), 500
        });
    })
    .use(connect.errorHandler())
    .listen(3000);