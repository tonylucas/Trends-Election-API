const express = require('express'),
    router = express.Router(),
    GoogleTrends = require('../models/google-trends');

router.get('/', function(req, res, next) {
    res.send('Parameter is missing.');
});

// GET historical trend data to a provided trend or an array of trends.
router.get('/:keyword', function(req, res, next) {
    GoogleTrends.getByKeyword(req.params.keyword,
        function(data) {
            res.json(data);
        },
        function(error) {
            console.log('Oh no error!', error);
            res.send(error);
        });
});

// Get Google trend with post params for multiple keywords.
router.post('/', function(req, res, next) {
    GoogleTrends.getByKeywords(req.body.keywords,
        function(data) {
            res.json(data);
        },
        function(error) {
            console.log('Oh no error!', error);
            res.send(error);
        });
});

module.exports = router;
