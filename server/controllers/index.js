const express = require('express'),
    router = express.Router(),
    Match = require('../models/match');

router.use('/keywords', require('./keywords'));
router.use('/trends', require('./trends'));
router.use('/matchs', require('./matchs'));
router.use('/google-trends', require('./google-trends'));
router.use('/google-autocomplete', require('./google-autocomplete'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'API Projet Perso 😇'
    });
});

module.exports = router;
