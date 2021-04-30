var express = require('express');


var cookieParser = require('cookie-parser');
// var db = require('./db');
var usersRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/express-demo", {useNewUrlParser: true, useUnifiedTopology: true});

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();
app.set('view engine', 'pug')
app.set('views', './views')


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('jsdhfjhsdjfh3156'));
app.use(sessionMiddleware);

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index', {
  	name: 'guys'
  });
});


app.use('/users',  authMiddleware.requireAuth, usersRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});