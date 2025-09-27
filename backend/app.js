var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config({ quiet: true }); 

var coursesRouter = require('./routes/courses');
var aiRouter = require('./routes/ai');
var usersRouter = require('./routes/users');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(
    path.join(__dirname, '../frontend/dist/public'),
    { index: false }
));

app.use('/api/courses', coursesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/users', usersRouter);

// serve all routes to react
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/public/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// global error handler (JSON)
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
