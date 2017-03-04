var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var index = require('./routes/index');
var trends = require('./routes/trends');
var googleTrends = require('./routes/google-trends');
var keywords = require('./routes/keywords');
var matchs = require('./routes/matchs');

var app = express();


// Configuration
mongoose.connect('mongodb://localhost/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use it before all route definitions
app.use(cors({
    "origin": [
        "http://localhost:4200",
        "http://178.62.124.181:8080",
        "http://tony-lucas.com:8080",
        "http://app.tony-lucas.com"
    ],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use('/', index);
app.use('/trends', trends);
app.use('/google-trends', googleTrends);
app.use('/keywords', keywords);
app.use('/matchs', matchs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})

module.exports = app;
