var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 7000;
var nav = [
  {
    link: '/books',
    text: 'Books'
  },
  {
    link: '/auth/logout',
    text: 'Logout'
  }
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var authorRouter = require('./src/routes/authorRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
  if (!req.user) {
    res.redirect('/auth/login');
  }

  res.redirect('/books');
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
