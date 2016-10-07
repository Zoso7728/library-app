var express = require('express');
var app = express();

var port = process.env.PORT || 7000;
var nav = [
  {
    link: '/books',
    text: 'Books'
  },
  {
    link: '/authors',
    text: 'Authors'
  }
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var authorRouter = require('./src/routes/authorRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.get('/', function(req, res) {
  res.render('index', {nav: nav});
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
