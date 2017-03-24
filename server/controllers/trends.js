const express = require('express'),
    router = express.Router(),
    googleTrendsAPI = require('google-trends-api'),
    mongoose = require('mongoose'),
    Trend = require('../models/trend');


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
