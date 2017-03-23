const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// Routes
// Get all matchs
router.get('/', (req, res) => {
    console.log("Fetching matchs");
    Match.get(function(matchs) {
        res.json(matchs);
    });
});

// Get match
router.get('/:match_id', (req, res) => {
    console.log("Fetching match by id");

    Match.getById(req.params.match_id, function(matchs) {
        res.json(matchs);
    });
});

// Create match and send back all matchs after creation
router.post('/', (req, res) => {
    console.log("Creating new match");
    Match.create({
        name: req.body.name,
        keywords: req.body.keywords,
        type: req.body.type
    }, (match) => {
        res.json(match);
    });
});

// Update a match
router.put('/:match_id', (req, res) => {
    Match.update(req.params.match_id, {}, (match) => {
        res.json(match);
    });
});

// Delete a match
router.delete('/:match_id', (req, res) => {
    Match.delete(req.params.match_id, (match) => {
        console.log("Match supprimé : " + match);
        res.json(match);
    });
});

module.exports = router;