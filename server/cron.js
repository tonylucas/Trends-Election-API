const Cron   = require('./models/cron'),
    schedule = require('node-schedule');


// https://crontab.guru/#0_*_*_*_
// schedule.scheduleJob('1,2,3 * * * * *', () =>{

// 0 0 */2 * * * At minute 0 every 2 hours


console.log("\n\n\n\n\n------");

schedule.scheduleJob('0 0 */2 * * *', () => {
    updateTrends();
});
updateTrends();

let logFile = 'logs.txt';

function updateTrends() {
    Cron.updateTrends();
}
