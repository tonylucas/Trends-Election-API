const express    = require('express'),
    router       = express.Router(),
    googleTrends = require('google-trends-api'),
    mongoose     = require('mongoose');



exports.getByKeyword = (keyword, callback, callbackError) => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

    const options = {
        keyword: keyword,
        startTime: threeMonthsAgo, // defaults new Date('2004-01-01')
        // endTime: new Date(Date.now()),
        geo: 'FR',
        hl: 'fr' // Preferred language code for results
    }

    googleTrends.interestOverTime(options, function(err, results) {
        if (err) {
            callbackError(err);
        } else {
            var results = JSON.parse(results).default;
            results.timelineData.forEach(function(value) {
                delete value.formattedValue
                delete value.formattedAxisTime
                var val = value.value[0];
                delete value;
                value.value = val;
            });

            callback(results.timelineData);
        }
    });
};

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return date;
}

exports.getByKeywords = (args, callback, callbackError) => {

    const period   = args.period;
    const keywords = args.keywords;
    const today    = new Date();

    let startDate;
    let endDate = today

    // if (typeof args.endDate !== 'undefined') {
    //     let d = args.endDate.split('-');
    //     endDate = new Date(d[0], d[1]-1, d[2]);
    //     // endDate = addDays(endDate, 1);
    // }
    // console.log(args.endDate);
    // console.log(args.endDate.replace(/-/g, ','));
    // console.log(endDate);
    // console.log(new Date("2017,04,23"));

    switch (period) {
        case "now 1-d":
            startDate = new Date(today.setDate(endDate.getDate() - 1));
            break;

        case "now 7-d":
            startDate = new Date(today.setDate(endDate.getDate() - 6.99));
            break;

        default:
            break

    }

    console.log(startDate);
    console.log(endDate);
    console.log("----");

    const tenDaysAgo = new Date(today.setDate(today.getDate() - 6.99));
    // const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

    const options = {
        keyword: keywords,
        startTime: startDate, // defaults new Date('2004-01-01')
        // startTime: threeMonthsAgo,
        endTime: endDate,
        geo: 'FR',
        hl: 'fr' // Preferred language code for results
    }

    googleTrends.interestOverTime(options, function(err, results) {
        if (err) {
            callbackError(err);
        } else {
            callback(JSON.parse(results));
        }
    });
};
