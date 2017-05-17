const express    = require('express'),
    mongoose = require('mongoose'),
    schedule     = require('node-schedule'),
    fs           = require('fs'),
    Trend        = require('./trend'),
    Keyword      = require('./keyword'),
    Match        = require('./match'),
    GoogleTrends = require('./google-trends');



exports.updateTrends = (callback) => {

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

    let p1 = new Promise(
        function(resolve, reject) {

            // Update keywords trends
            Keyword.get((keywords) => {
                keywords.forEach((k, index) => {
                    const keyword = k;

                    Keyword.setTwitterAvatar({
                        id: keyword._id,
                        twitterUsername: keyword.twitterName
                    }, () => {
                        if (index === keywords.length - 1) {
                            resolve();
                        }
                    });

                    // GoogleTrends.getByKeyword(keyword.mid, (data) => {
                    //     Trend.create({
                    //         parentType: 'keyword',
                    //         parentName: keyword.title,
                    //         parentId: keyword._id,
                    //         values: data
                    //     }, () => {
                    //         fs.appendFile(logFile, `Keyword ${keyword.title} updated !\n`, () => {});
                    //     });
                    //
                    //     // Last
                    //     if (index === keywords.length - 1) {
                    //         resolve();
                    //     }
                    // }, () => {
                    //     fs.appendFile(logFile, `Keyword ${keyword.title} failed to update ! (failed retrieve trends)\n`, () => {});
                    //     fs.appendFile(logFile, `${data}\n`, () => {});
                    // });
                });
            });

        }
    );

    let p2 = new Promise(
        function(resolve, reject) {
            // Update matchs trends

            Match.get((matchs) => {
                matchs.forEach((m, index) => {
                    const match = m;
                    GoogleTrends.getByKeywords({
                        keywords: match.keywords,
                        endDate: match.endDate,
                        geo: match.geo,
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
                        geo: match.geo,
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

    Promise.all([p0, p1, p2, p3]).then(values => {
        // Delete old trends
        for (trend of oldTrends) {
            Trend.delete(trend, (data) => {

            }, (error) => {
                console.log(error);
            });
        }
        console.log(oldTrends.length + " trends updated");
    });

};
