var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('xml2json');

/* GET home page. */
exports.get = router.get('/', function(req, res) {
    res.render('index', {});
});
/* GET home page. */
exports.post = router.post('/', function(req, res) {
    var code = req.param('code');
    var contentTable = '';
    var contentNew = '';
    var query = "http://query.yahooapis.com/v1/public/yql?q=Select%20Name%2C%20Symbol%2C%20LastTradePriceOnly%2C%20Change%2C%20ChangeinPercent%2C%20PreviousClose%2C%20DaysLow%2C%20DaysHigh%2C%20Open%2C%20YearLow%2C%20YearHigh%2C%20Bid%2C%20Ask%2C%20AverageDailyVolume%2C%20OneyrTargetPrice%2C%20MarketCapitalization%2C%20Volume%2C%20Open%2C%20YearLow%20from%20yahoo.finance.quotes%20where%20symbol%3D%22"+ code + "%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    request(query, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            contentTable = parser.toJson(body);
            query = 'http://feeds.finance.yahoo.com/rss/2.0/headline?s=' + code +'&region=US&lang=en-US';
            request(query, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    contentNew = parser.toJson(body);
                    //console.log(contentNew);
                    res.set('Content-Type', 'application/json');
                    res.send('{ "table":' + contentTable + ', "new":' + contentNew + '}');
                }
            });
        }
    });
});

