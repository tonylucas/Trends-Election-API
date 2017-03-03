var express = require('express');
var router = express.Router();
var googleTrends = require('google-trends-api');
var mongoose = require('mongoose');

// Model
var trendSchema = new mongoose.Schema({
    parentType: String,
    parentName: String,
    parentId: String,
    values: String,
    period: String,
}, {
    timestamps: true
});
var Trend = mongoose.model('Trend', trendSchema);

// Routes

// Get local trends
router.get('/', function(req, res) {
    // Use mongoose to get all keywords in the database
    Trend.find(function(err, trends) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        else
            res.json(trends); // return all keywords in JSON format
    });
});

// Get local trend values from id
router.get('/:trend_id', function(req, res) {
    // Use mongoose to get the keyword in the database
    Trend.findOne({
        '_id': req.params.trend_id
    }, function(err, trend) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(trend); // Return the trend values in JSON format
    });
});

// Get local trend values from keyword/match id
router.get('/parent/:parent_id', function(req, res) {
    // Use mongoose to get the keyword in the database
    Trend.findOne({
        parentId: req.params.parent_id
    }, function(err, trend) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(trend); // Return the trend values in JSON format
    });
});


// Create keyword and send back row id after creation
router.post('/', function(req, res) {
    Trend.create({
        parentType: req.body.parentType,
        parentName: req.body.parentName,
        parentId: req.body.parentId,
        values: req.body.values,
        period: "3-month"
    }, function(err, trend) {
        if (err)
            res.send(err);

        res.send(trend);
    });
});

// Delete a trend
router.delete('/:trend_id', function(req, res) {
    Trend.remove({
        _id: req.params.trend_id
    }, function(err, trend) {
        if (err)
            res.send(err);

        res.send("Trend supprimé : " + trend);
    });
});

router.get('/parentid/:parent_id', function(req, res) {
    Trend.find({
        parentId: req.params.parent_id
    }, function(err, trend) {
        if (err)
            res.send(err);

        res.json(trend);
    });
});

router.delete('/parentid/:parent_id', function(req, res) {
    Trend.remove({
        parentId: req.params.parent_id
    }, function(err, trend) {
        if (err)
            res.send(err);

        res.send("Trend(s) supprimé(s) : " + trend);
    });
});

module.exports = router;
