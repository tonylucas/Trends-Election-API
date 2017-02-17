var express = require('express');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

var app = express();

// Configuration
mongoose.connect('mongodb://localhost/trends');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Trend = mongoose.model('Trend', {
    name: String,
    values: String,
    type: String
});

// Routes

// Get trends
app.get('/api/trends', function(req, res) {

    console.log("fetching trends");

    // use mongoose to get all trends in the database
    Trend.find(function(err, trends) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(trends); // return all trends in JSON format
    });
});

// Get trend
app.get('/api/trends/:trend_id', function(req, res) {

    console.log("fetching trend by id");

    // Use mongoose to get the trend in the database
    Trend.findOne({'_id': req.params.trend_id}, function(err, trend) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(trend); // Return the trend in JSON format
    });
});

// Create trend and send back all trends after creation
app.post('/api/trends', function(req, res) {
    Trend.create({
        name: req.body.name,
        values: req.body.values,
        type: req.body.type,
        done: false
    }, function(err, trend) {
        if (err)
            res.send(err);

        // Get and return all the trends after you create another
        Trend.find(function(err, trends) {
            if (err)
                res.send(err)
            res.json(trends);
        });
    });

});

// Update a trend
app.put('/api/trends/:trend_id', function(req, res) {

});

// Delete a trend
app.delete('/api/trends/:trend_id', function(req, res) {
    Trend.remove({
        _id: req.params.trend_id
    }, function(err, trend) {
        if (err)
            res.send(err);

        console.log("Trend supprimé : " + trend);
    });
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
