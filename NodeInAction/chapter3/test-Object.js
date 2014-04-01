/**
 * Created by caoyangkaka on 3/31/14.
 */
var Currency = require('./currencyObject'), caD = 0.91;
currency = new Currency(caD);
console.log('50 can dollar equals this amount of dollar of US:');
console.log(currency.canadianToUS(50));
console.log('In the other way:');
console.log(currency.USToCanadian(50));