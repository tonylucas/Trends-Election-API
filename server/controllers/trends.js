const express = require('express');
const router = express.Router();
const googleTrendsAPI = require('google-trends-api');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const fs = require('fs');
const Trend = require('../models/trend');
// Every 3 seconds : */3 * * * * *
// Every 2 hours : * * */2 * * *
// https://crontab.guru/#0_*_*_*_

// At minute 30 every hour
// schedule.scheduleJob('0 * * * *', () =>{
//     console.log('The answer to life, the universe, and everything!');
// });

let logFile = 'logs.txt';



function updateTrends() {
    deleteKeywordsTrends();
    deleteMatchsTrends();

    Keyword.find((err, keywords) => {
        let today = new Date();
        let threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

        for (k of keywords) {
            const keyword = k;
            const options = {
                keyword: keyword.mid,
                startTime: threeMonthsAgo, // defaults new Date('2004-01-01')
                // endTime: new Date(Date.now()),
                geo: 'FR',
                hl: 'fr' // Preferred language code for results
            }

            googleTrendsAPI.interestOverTime(options, (err, results) => {

                if (err) {
                    fs.appendFile(logFile, `${err}\n`, () => {});
                } else {
                    let results = JSON.parse(results).default;
                    results.timelineData.forEach((value) => {
                        delete value.formattedValue
                        delete value.formattedAxisTime
                        let val = value.value[0];
                        delete value;
                        value.value = val;
                    });

                    Trend.create({
                        parentType: "keyword",
                        parentName: keyword.title,
                        parentId: keyword._id,
                        values: JSON.stringify(results.timelineData),
                        period: "3-month"
                    }, (err, trend) => {
                        if (err)
                            fs.appendFile(logFile, `${err}\n`, () => {});

                        fs.appendFile(logFile, `Keyword ${keyword.title} updated !\n`, () => {});
                    });
                }
            });
        }
    });

    Match.find((err, matchs) => {
        let today = new Date();
        let threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

        for (m of matchs) {
            const match = m;
            const options = {
                keyword: match.keywords,
                startTime: threeMonthsAgo, // defaults new Date('2004-01-01')
                // endTime: new Date(Date.now()),
                geo: 'FR',
                hl: 'fr' // Preferred language code for results
            }

            // console.log(options);
            googleTrendsAPI.interestOverTime(options, (err, results) => {
                console.log(match.name);
                // console.log(results);
                console.log(err);
                if (err) {
                    fs.appendFile(logFile, `${err}\n`, () => {});
                } else {
                    let results = JSON.parse(results).default;
                    results.timelineData.forEach((value) => {
                        delete value.formattedValue
                        delete value.formattedAxisTime
                        let val = value.value[0];
                        delete value;
                        value.value = val;
                    });

                    Trend.create({
                        parentType: "match",
                        parentName: match.title,
                        parentId: match._id,
                        values: JSON.stringify(results.timelineData),
                        period: "3-month"
                    }, (err, trend) => {
                        if (err)
                            fs.appendFile(logFile, `${err}\n`, () => {});

                        fs.appendFile(logFile, `Match ${match.name} updated !\n`, () => {});
                    });
                }
            });
        }
    });
}
// updateTrends();

function deleteKeywordsTrends() {
    Keyword.find((err, keywords) => {
        fs.appendFile(logFile, `\n--------------------\n${new Date()} \nKeywords :\n`, () => {});
        for (keyword of keywords) {
            fs.appendFile(logFile, `${keyword.title} (${keyword.mid})\n`, () => {});
        }

        Trend.remove({
            parentType: 'keyword'
        }, (err, trend) => {
            if (err)
                fs.appendFile(logFile, `${err}\n`, () => {});

            fs.appendFile(logFile, 'All keywords trends supprimés.\n', () => {});
        });

    });
}

function deleteMatchsTrends() {
    Match.find((err, matchs) => {
        fs.appendFile(logFile, `\nMatchs :\n`, () => {});
        for (match of matchs) {
            fs.appendFile(logFile, `${match.name}\n`, () => {});
        }

        Trend.remove({
            parentType: 'match'
        }, (err, trend) => {
            if (err)
                fs.appendFile(logFile, `${err}\n`, () => {});

            fs.appendFile(logFile, '\nAll matchs trends supprimés.\n', () => {});
        });

    });
}


// Routes

// Get local trends
router.get('/', (req, res) => {
    console.log("Fetching trends");
    Trend.get((trends) => {
        res.json(trends);
    });
});

// Get local trend values from id
router.get('/:trend_id', (req, res) => {
    console.log("Fetching trend by id");
    // Use mongoose to get the keyword in the database
    Trend.getById(req.params.trend_id, (trend) => {
        res.json(trend);
    });
});

// Create keyword and send back row id after creation
router.post('/', (req, res) => {
    Trend.create({
        parentType: req.body.parentType,
        parentName: req.body.parentName,
        parentId: req.body.parentId,
        values: req.body.values,
        period: "3-month"
    }, (trend) => {
        res.send(trend);
    });
});

// Delete a trend
router.delete('/:trend_id', (req, res) => {
    Trend.delete(req.params.parent_id, (trend) => {
        console.log("Trend supprimé : ", trend);
        res.json(trend);
    });
});

router.get('/parentid/:parent_id', (req, res) => {
    Trend.getByParentId(req.params.parent_id, (trend) => {
        res.json(trend);
    });
});

router.delete('/parentid/:parent_id', (req, res) => {
    Trend.deleteByParentId(req.params.parent_id, (trend) => {
        console.log("Trend(s) supprimé(s) : ", trend);
        res.json(trend);
    });

});

module.exports = router;
