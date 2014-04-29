/**
 * Created by caoyangkaka on 4/28/14.
 */
process.stdin.resume();
process.on('SIGINT', function() {
    console.log('Got SIGINT. Exiting.');
    process.exit(0);
});
