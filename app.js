var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');
var dotenv = require('dotenv');
dotenv.config();

const mariadb = require('mariadb/callback');
const db = mariadb.createConnection(
      {host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE,
       port: process.env.DB_PORT});


// connect to database

db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database due to error: " + err);
    res.render('error');
  } else 	{
    console.log("Connected to DB");
  }
});
global.db = db;





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var privacyRouter = require('./routes/privacy');
var helpRouter = require('./routes/help');
var dynaRouter = require('./routes/dyna');

var supplierRouter = require('./routes/supplier');
var categoryRouter = require('./routes/category');
var customerRouter = require('./routes/customer');
var orderdetailRouter = require('./routes/orderdetail');
var saleorderRouter = require('./routes/saleorder');
var subscriptionRouter = require('./routes/subscription');
var reviewRouter = require('./routes/review');

var searchRouter = require('./routes/search');
var reportRouter = require ('./routes/report');
var app = express();

app.use(layouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);

app.use('/product' , productRouter);
app.use('/supplier', supplierRouter);
app.use('/category', categoryRouter);
app.use('/customer', customerRouter);

app.use('/orderdetail', orderdetailRouter );
app.use('/saleorder' , saleorderRouter);
app.use('/subscription', subscriptionRouter);

app.use('/review', reviewRouter );

app.use('/search', searchRouter);
app.use('/report',reportRouter );

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
