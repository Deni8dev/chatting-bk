const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/socket.io', indexRouter);

// DB Configuration:
mongoose
   .connect('mongodb://mongodb:27017/cht?retryWrites=true', { useNewUrlParser: true })
   .then(() => console.log('>> Mongo DB connected...'))
   .catch(err => console.error(err));

// catch 404 and forward to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use((err, req, res) => {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

module.exports = app;
