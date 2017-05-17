const express = require('express'),
    router = express.Router();

router.use('/keywords', require('./keywords'));
router.use('/trends', require('./trends'));
router.use('/matchs', require('./matchs'));
router.use('/google-trends', require('./google-trends'));
router.use('/google-autocomplete', require('./google-autocomplete'));
router.use('/cron', require('./cron'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'API Projet Perso 😇'
    });
});

module.exports = router;
