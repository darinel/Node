/**
 * Created by caoyangkaka on 4/22/14.
 */
var connect = require('connect');
console.log(process.cwd());
var app = connect()
    .use(connect.bodyParser())
    .use(function(req, res, next) {
        console.log(req.url);
        next();
    })
    .use('/list', connect.directory('Chapter7', {icons: true, hidden: true}))
    .use('/list', connect.static('Chapter7', {hidden:true}))
    .listen(3000);