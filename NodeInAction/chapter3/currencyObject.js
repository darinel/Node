/**
 * Created by caoyangkaka on 3/31/14.
 */
var Currency = function(canadianDollar) {
    this.canadianDollar = canadianDollar;
}

Currency.prototype.roundTwoDecimals = function(amount) {
    return Math.round( amount * 100) / 100;
}

Currency.prototype.canadianToUS = function(ca) {
    return this.roundTwoDecimals(ca * this.canadianDollar);
}

Currency.prototype.USToCanadian = function(us) {
    return this.roundTwoDecimals(us / this.canadianDollar);
}

module.exports = Currency;

