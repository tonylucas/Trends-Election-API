const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

const index = require('./controllers/index');
const keywords = require('./controllers/keywords');
const matchs = require('./controllers/matchs');
const trends = require('./controllers/trends');
const googleTrends = require('./controllers/google-trends');
const googleAutocomplete = require('./controllers/google-autocomplete');

const cron = require('./cron');

const app = express();


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
// app.use(cors({
//     origin: [
//         "http://localhost:4200",
//         "http://localhost:4200",
//         "https://178.62.124.181:8080",
//         "https://tony-lucas.com:8080",
//         "https://app.tony-lucas.com",
//         "http://app.tony-lucas.com"
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
// }));
app.use(cors());

app.use(require('./controllers'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
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
});

module.exports = app;
