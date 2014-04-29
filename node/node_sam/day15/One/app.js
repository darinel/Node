/**
 * Created by caoyangkaka on 4/28/14.
 */
var https = require('https');

var options = {
    host: 'api.github.com',
    path: '/legacy/repos/search/node',
    method: 'GET',
    headers: { 'user-agent': 'mattycao'}
};

var request = https.request(options, function(response){
    var body = '';
    response.on("data", function(chunk){
        body += chunk;
    });

    response.on("end", function(){
        var r = JSON.parse(body);
        for(var i = 0; i < r.repositories.length; i++) {
            console.log(r.repositories[i].description);
        }
    });
});

request.end();

