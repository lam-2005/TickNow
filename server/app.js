var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var cors = require('cors');

var corsOptionsDelegate = function (req, callback) {
  var corsOptions= { origin: true };
  callback(null, corsOptions);
}


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cinemas = require('./routes/cinemas');
const films = require('./routes/film');
const popcorns = require('./routes/popcorns');
const payments = require('./routes/payments');
const locations = require('./routes/locations');
const bills = require('./routes/bills');
const billFoods =  require('./routes/billFoods');
const comments = require('./routes/comments');
const tickets = require('./routes/tickets');
const brands = require('./routes/brands');
const drinks = require('./routes/drinks');
const promotions = require('./routes/promotions');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors(corsOptionsDelegate));

// kết nối database mongodb
mongoose.connect('mongodb://localhost:27017/tickNow')
.then(()=>{console.log('Kết nối thành công')})
.catch(err=> console.log(err))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cinema', cinemas);
app.use('/film', films);
app.use('/popcorn', popcorns);
app.use('/payment', payments);
app.use('/location', locations);
app.use('/bill', bills);
app.use('/billFood', billFoods);
app.use('/comment', comments);
app.use('/ticket', tickets);
app.use('/brand', brands);
app.use('/drink', drinks);
app.use('/promotion', promotions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
