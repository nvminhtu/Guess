const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const userapp = require('./routes/userapp');
const adminapp = require('./routes/adminapp');
const adminapi = require('./routes/adminapi');
const compression = require('compression')

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/manifest', express.static(path.join(__dirname, 'manifest')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', userapp);
app.use('/adminapp', adminapp);
app.use('/adminapi', adminapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('userapp');
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
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
