var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Models
var Keyword = mongoose.model('Keyword', {
    name: String,
    values: String,
    type: String
});

// Routes
// Get keywords
router.get('/', function(req, res) {

    console.log("fetching keywords");

    // use mongoose to get all keywords in the database
    Keyword.find(function(err, keywords) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        else

        res.json(keywords); // return all keywords in JSON format

    });
});

// Get keyword
router.get('/:keyword_id', function(req, res) {

    console.log("fetching keyword by id");

    // Use mongoose to get the keyword in the database
    Keyword.findOne({'_id': req.params.keyword_id}, function(err, keyword) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(keyword); // Return the keyword in JSON format
    });
});

// Create keyword and send back all keywords after creation
router.post('/', function(req, res) {
    Keyword.create({
        name: req.body.name,
        values: req.body.values,
        type: req.body.type,
        done: false
    }, function(err, keyword) {
        if (err)
            res.send(err);

        // Get and return all the keywords after you create another
        Keyword.find(function(err, keywords) {
            if (err)
                res.send(err)
            res.json(keywords);
        });
    });
});

// Update a keyword
router.put('/:keyword_id', function(req, res) {

});

// Delete a keyword
router.delete('/:keyword_id', function(req, res) {
    Keyword.remove({
        _id: req.params.keyword_id
    }, function(err, keyword) {
        if (err)
            res.send(err);

        console.log("Keyword supprimé : " + keyword);
    });
});

module.exports = router;
