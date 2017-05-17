const express    = require('express'),
    router       = express.Router(),
    googleTrends = require('google-trends-api'),
    mongoose     = require('mongoose'),
    moment = require('moment');



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
    const geo = args.geo;
    const today    = moment();

    let startDate;
    let endDate = today

    if (typeof args.endDate !== 'undefined') {
        endDate = moment(args.endDate, "YYYY-MM-DD").set('hour', 12);
    }

    switch (period) {
        case "now 1-d":
            // startDate = new Date(today.setDate(endDate.getDate() - 1));
            startDate = moment(endDate).subtract(1, 'day');
            break;

        case "now 7-d":
            // startDate = new Date(today.setDate(endDate.getDate() - 6.99));
            startDate = moment(endDate).subtract(6, 'day');
            break;

        default:
            break
    }

    const options = {
        keyword: keywords,
        startTime: startDate.toDate(), // defaults new Date('2004-01-01')
        endTime: endDate.toDate(),
        geo: geo,
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
