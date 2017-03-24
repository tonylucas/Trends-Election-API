var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/:keyword', function(req, res, next) {
    var url = "http://trends.google.com/trends/api/autocomplete/" + req.params.keyword + "?hl=fr&tz=-60";

    request(url, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //res.send(body); // Print the HTML for the Google homepage.
        let parsedData = JSON.parse(body.replace(")]}',", ""));
        parsedData.default.topics.unshift({
            title: req.params.keyword,
            mid: req.params.keyword,
            type: "Terme de recherche"
        });
        res.json(parsedData);
    });

    req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });

});

module.exports = router;
