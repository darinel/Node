/**
 * Created by caoyangkaka on 3/31/14.
 */
var currency = require('./currency');

console.log('50 can dollar equals this amount of dollar of US:');
console.log(currency.canadianToUS(50));
console.log('In the other way:');
console.log(currency.USToCanadian(50));