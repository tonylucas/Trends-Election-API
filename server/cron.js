const express    = require('express'),
    schedule     = require('node-schedule'),
    fs           = require('fs'),
    Trend        = require('./models/trend'),
    Keyword      = require('./models/keyword'),
    Match        = require('./models/match'),
    GoogleTrends = require('./models/google-trends');



// https://crontab.guru/#0_*_*_*_
// schedule.scheduleJob('1,2,3 * * * * *', () =>{

// 0 0 */2 * * * At minute 0 every 2 hours


console.log("\n\n\n\n\n------");

schedule.scheduleJob('0 0 */2 * * *', () => {
    updateAll();
});

let logFile = 'logs.txt';

function updateAll() {
    let logFile = 'logs.txt';
    fs.appendFile(logFile, `\n--------------------\n${new Date()} \n`, () => {});

    // Getting old trends to be replaced
    let oldTrends = [];

    let p0 = new Promise(
        function(resolve, reject) {
            Trend.get((trends) => {
                for (trend of trends) {
                    oldTrends.push(trend._id);
                }
                resolve();
            });
        }
    );

    // let p1 = new Promise(
    //     function(resolve, reject) {
    //
    //         // Update keywords trends
    //         Keyword.get((keywords) => {
    //             keywords.forEach((k, index) => {
    //                 const keyword = k;
    //                 GoogleTrends.getByKeyword(keyword.mid, (data) => {
    //                     Trend.create({
    //                         parentType: 'keyword',
    //                         parentName: keyword.title,
    //                         parentId: keyword._id,
    //                         values: data
    //                     }, () => {
    //                         fs.appendFile(logFile, `Keyword ${keyword.title} updated !\n`, () => {});
    //                     });
    //
    //                     // Last
    //                     if (index === keywords.length - 1) {
    //                         resolve();
    //                     }
    //                 }, () => {
    //                     fs.appendFile(logFile, `Keyword ${keyword.title} failed to update ! (failed retrieve trends)\n`, () => {});
    //                     fs.appendFile(logFile, `${data}\n`, () => {});
    //                 });
    //             });
    //         });
    //
    //     }
    // );

    let p2 = new Promise(
        function(resolve, reject) {
            // Update matchs trends

            Match.get((matchs) => {
                matchs.forEach((m, index) => {
                    const match = m;
                    GoogleTrends.getByKeywords({
                        keywords: match.keywords,
                        endDate: match.endDate,
                        period: "now 7-d"
                    }, (data) => {
                        Trend.create({
                            parentType: 'match',
                            parentName: match.name,
                            parentId: match._id,
                            period: "now 7-d",
                            values: JSON.stringify(data)
                        }, (err) => {
                            fs.appendFile(logFile, `Match ${match.title} (${match.subTitle}) updated ! (7 jours)\n`, () => {});
                        });

                        // Last
                        if (index === matchs.length - 1) {
                            resolve();
                        }
                    }, (data) => {
                        fs.appendFile(logFile, `Match ${match.title} (${match.subTitle}) failed to update ! (failed retrieve trends)\n`, () => {});
                        fs.appendFile(logFile, `${data}\n`, () => {});
                    });


                });
            });
        }
    );

    let p3 = new Promise(
        function(resolve, reject) {
            // Update matchs trends
            Match.get((matchs) => {
                matchs.forEach((m, index) => {
                    const match = m;

                    GoogleTrends.getByKeywords({
                        keywords: match.keywords,
                        endDate: match.endDate,
                        period: "now 1-d"
                    }, (data) => {
                        Trend.create({
                            parentType: 'match',
                            parentName: match.name,
                            parentId: match._id,
                            period: "now 1-d",
                            values: JSON.stringify(data)
                        }, (err) => {
                            fs.appendFile(logFile, `Match ${match.title} (${match.subTitle}) updated ! (24h)\n`, () => {});
                        });

                        // Last
                        if (index === matchs.length - 1) {
                            resolve();
                        }
                    }, (data) => {
                        fs.appendFile(logFile, `Match ${match.title} (${match.subTitle}) failed to update ! (failed retrieve trends)\n`, () => {});
                        fs.appendFile(logFile, `${data}\n`, () => {});
                    });


                });
            });
        }
    );

    Promise.all([p0, p2, p3]).then(values => {
        // Delete old trends
        for (trend of oldTrends) {
            Trend.delete(trend, (data) => {

            }, (error) => {
                console.log(error);
            });
        }
        console.log(oldTrends.length + " trends updated");
    });

}
