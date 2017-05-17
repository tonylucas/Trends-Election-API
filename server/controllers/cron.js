const express = require('express'),
    router = express.Router(),
    Cron = require('../models/cron');


// Routes

// Update all trends values
router.post('/', (req, res) => {
    Cron.updateTrends();
});


module.exports = router;
