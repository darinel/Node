/**
 * Created by caoyangkaka on 3/31/14.
 */
var canadianDollar = 0.91;

function roundTwoDecimal(amount) {
    return Math.round(amount * 100) / 100;
}

exports.canadianToUS = function(canadian) {
    return roundTwoDecimal(canadian * canadianDollar);
}

exports.USToCanadian = function(us) {
    return roundTwoDecimal(us / canadianDollar);
}


