const express = require('express'),
    router = express.Router(),
    googleTrends = require('google-trends-api'),
    mongoose = require('mongoose');



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

exports.getByKeywords = (kwds, callback, callbackError) => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
    const keywords = kwds;

    const options = {
        keyword: keywords,
        startTime: threeMonthsAgo, // defaults new Date('2004-01-01')
        // endTime: new Date(Date.now()),
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
