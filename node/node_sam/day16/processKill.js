/**
 * Created by caoyangkaka on 4/28/14.
 */
console.log('Process ID:' + process.pid);
process.on('SIGINT', function() {
    console.log('Got a SIGINT. Exiting.');
    process.exit(0);
});

process.on('SIGTERM', function() {
   console.log('Got a SIGTERM. Exiting.');
    process.exit(0);
});

setInterval(function() {
    // keep the app running
}, 1000);

console.log('Run kill ' + process.pid + ' to send a SIGTERM.');
console.log('Run kill -s SIGINT ' + process.pid + ' to send a SIGINT');