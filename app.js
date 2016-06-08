// var express = require('express');
// var app     = express();

// app.set('port', (process.env.PORT || 5000));
// app.use(express.static( __dirname + '/public' ));

// app.get('/', function ( request, response ) {
//   response.send( process.env.UD_KEY );
//   console.log( process.env.UD_KEY );
// })

// app.listen(app.get('port' ), function() {
//   console.log( "Node app is running at localhost:" + app.get('port') );
// })


var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// Database
var mongo = require('mongodb');
var monk  = require('monk');
var db    = monk('localhost:27017/dirtywords');

var routes = require('./routes/index');
var other  = require('./routes/other');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/other', other);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
