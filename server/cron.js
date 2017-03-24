const express = require('express'),
    schedule = require('node-schedule'),
    fs = require('fs'),
    Trend = require('./models/trend'),
    Keyword = require('./models/keyword'),
    Match = require('./models/match'),
    GoogleTrends = require('./models/google-trends');



// https://crontab.guru/#0_*_*_*_
// schedule.scheduleJob('1,2,3 * * * * *', () =>{

// 0 0 */2 * * * At minute 0 every 2 hours


console.log("\n\n\n\n\n------");

schedule.scheduleJob('0 0 */2 * * *', () => {
    console.log(new Date());
    updateAll();
});


let logFile = 'logs.txt';
fs.appendFile(logFile, `\n--------------------\n${new Date()} \n`, () => {});

function updateAll() {
    console.log("updateAll");
    // Getting old trends to be replaced
    let oldTrends = [];

    var p0 = new Promise(
        function(resolve, reject) {
            Trend.get((trends) => {
                for (trend of trends) {
                    oldTrends.push(trend._id);
                }
                resolve();
            });
        }
    );

    var p1 = new Promise(
        function(resolve, reject) {

            // Update keywords trends
            Keyword.get((keywords) => {
                keywords.forEach((k, index) => {
                    const keyword = k;
                    GoogleTrends.getByKeyword(keyword.mid, (data) => {
                        Trend.create({
                            parentType: 'keyword',
                            parentName: keyword.title,
                            parentId: keyword._id,
                            values: data
                        }, () => {
                            fs.appendFile(logFile, `Keyword ${keyword.title} updated !\n`, () => {});
                        });

                        // Last
                        if (index === keywords.length - 1) {
                            resolve();
                        }
                    }, () => {
                        fs.appendFile(logFile, `Keyword ${keyword.title} failed to update ! (failed retrieve trends)\n`, () => {});
                        fs.appendFile(logFile, `${data}\n`, () => {});
                    });
                });
            });

        }
    );

    var p2 = new Promise(
        function(resolve, reject) {
            // Update matchs trends
            Match.get((matchs) => {
                matchs.forEach((m, index) => {
                    const match = m;
                    GoogleTrends.getByKeywords(match.keywords, (data) => {
                        Trend.create({
                            parentType: 'match',
                            parentName: match.name,
                            parentId: match._id,
                            values: data
                        }, () => {
                            fs.appendFile(logFile, `Match ${match.name} updated !\n`, () => {});
                        });

                        // Last
                        if (index === matchs.length - 1) {
                            resolve();
                        }
                    }, (data) => {
                        fs.appendFile(logFile, `Match ${match.name} failed to update ! (failed retrieve trends)\n`, () => {});
                        fs.appendFile(logFile, `${data}\n`, () => {});
                    });

                });
            });
        }
    );

    Promise.all([p0, p1, p2]).then(values => {
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
