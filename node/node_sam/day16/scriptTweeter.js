#! /usr/bin/env node
/**
 * Created by caoyangkaka on 4/28/14.
 */
var https = require('https');

if(!process.argv[2]) {
    console.error('A search term is required.');
    process.exit(1);
}
var options = {
    host: 'api.github.com',
    path: '/legacy/repos/search/' + process.argv[2],
    method: 'GET',
    headers: { 'user-agent': 'mattycao'}
};

var request = https.request(options, function(res) {
    var data = '';
    var json = '';
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on('end', function(){
        json = JSON.parse(data);
        for(var i = 0; i < json.repositories.length; i++) {
            console.log(json.repositories[i].description);
        }
        process.exit(0);
    });
}).on('error', function(e) {
        console.log('Error:' + e.message);
        process.exit(1);
    });
request.end();