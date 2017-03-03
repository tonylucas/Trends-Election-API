var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Model
var matchSchema = new mongoose.Schema({
    name: String,
    keywords: [String],
    createdAt: Date,
    type: String
}, {
    timestamps: true
});

var Match = mongoose.model('Match', matchSchema);

// Routes
// Get all matchs
router.get('/', function(req, res) {
    console.log("fetching matchs");

    // use mongoose to get all matchs in the database
    Match.find(function(err, matchs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        else

            res.json(matchs); // return all matchs in JSON format

    });
});

// Get match
router.get('/:match_id', function(req, res) {

    console.log("fetching match by id");

    // Use mongoose to get the match in the database
    Match.findOne({
        '_id': req.params.match_id
    }, function(err, match) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(match); // Return the match in JSON format
    });
});

// Create match and send back all matchs after creation
router.post('/', function(req, res) {
    Match.create({
        name: req.body.name,
        keywords: req.body.keywords,
        type: req.body.type
    }, function(err, match) {
        if (err)
            res.send(err);

        // Get and return all the matchs after you create another
        Match.find(function(err, matchs) {
            if (err)
                res.send(err)
            res.json(matchs);
        });
    });
});

// Update a match
router.put('/:match_id', function(req, res) {

});

// Delete a match
router.delete('/:match_id', function(req, res) {
    Match.remove({
        _id: req.params.match_id
    }, function(err, match) {
        if (err)
            res.send(err);

        console.log("Match supprimé : " + match);
    });
});

module.exports = router;
