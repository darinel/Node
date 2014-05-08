/**
 * Created by caoyangkaka on 5/6/14.
 */
$("document").ready(function() {
    $("button").click(function() {
        event.preventDefault();
        var thing = $("input#input").val();
        if(!thing) {
            alert("Please enter a valid company symbol.");
        } else {
            $.post('/', {code : thing}, function(data, status) {
                if(status == 'success') {
                    //alert("data status:" + data);
                    var s = JSON.stringify(data);
                    //console.log(s);
                    //console.log(data.table.query.results.quote.MarketCapitalization);
                    if( jQuery.isEmptyObject(data.table.query.results.quote.MarketCapitalization)){
                        $("div#tableContent").html('<p><span class="glyphicon glyphicon-info-sign"></span><strong>' + thing + ' is not a valid company symbol.</strong></p>');
                    }else {
                        populateTable(data);
                    }

                }
            });
        }
    });

    function populateTable(data) {

        var html = '<h3 class="titleName">' + data.table.query.results.quote.Name + '</h3><div class="row col-sm-12 titleName"><table class="table table-striped">';
        html += '<tr><td>Change</td>' + '<td>' + data.table.query.results.quote.Change + '</td>' + '<td>LastTradePriceOnly</td>' + '<td>' + data.table.query.results.quote.LastTradePriceOnly + '</td>' +'</tr>';
        html += '<tr><td>Volume</td>' + '<td>' + data.table.query.results.quote.Volume + '</td>' + '<td>AverageDailyVolume</td>' + '<td>' + data.table.query.results.quote.AverageDailyVolume + '</td>' +'</tr>';
        html += '</table><h3 class="titleName"><span class="glyphicon glyphicon-bell"></span>Recent News</h3><ul>';
        for(var i = 0; i < 3; i++) {
            html += '<li><a href="' + data.new.rss.channel.item[i].link +'" target="_bank">' + data.new.rss.channel.item[i].title +'</a></li>';
        }
        html += '</ul></div>';
        $("div#tableContent").html(html);
    }
});