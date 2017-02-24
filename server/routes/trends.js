var express = require('express');
var router = express.Router();
var googleTrends = require('google-trends-api');
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
    res.send('Parameter is missing.');
});

/* GET historical trend data to a provided trend or an array of trends. */
router.get('/:keyword', function(req, res, next) {
    var today = new Date();
    var threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

    var options = {
        keyword: req.params.keyword,
        startTime: threeMonthsAgo, // defaults new Date('2004-01-01')
        // endTime: new Date(Date.now()),
        geo: 'FR',
        hl: 'fr' // Preferred language code for results
    }

    googleTrends.interestOverTime(options, function(err, results) {
        if (err) {
            console.log('oh no error!', err);
            res.send(err);
        } else {
            var results = JSON.parse(results).default;
            results.timelineData.forEach(function(value) {
                delete value.formattedValue
                delete value.formattedAxisTime
                var val = value.value[0];
                delete value;
                value.value = val;
            });
            res.json(results.timelineData);
        }
    });
});

router.get('/url/:trend', function(req, res, next) {
    // res.send("config :")
    options.trends = req.params.trend,
        // res.send(options);

        googleTrends.getUrlTrendData(options)
        .then(function(results) {
            res.send(results[0]);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;
