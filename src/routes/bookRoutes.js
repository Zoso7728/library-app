var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
  var books = [
    {
      title: 'The Name of The Wind',
      genre: 'Fantasy',
      author: 'Patrick Rothfuss',
      read: true
    },
    {
      title: 'The Wise Mans Fear',
      genre: 'Fantasy',
      author: 'Patrick Rothfuss',
      read: false
    },
    {
      title: 'The Lost Symbol',
      genre: 'Historical Fiction',
      author: 'Dan Brown',
      read: false
    },
    {
      title: 'Angels and Demons',
      genre: 'Historical Fiction',
      author: 'Dan Brown',
      read: true
    },
    {
      title: 'Inferno',
      genre: 'Historical Fiction',
      author: 'Dan Brown',
      read: false
    },
  ];

  bookRouter.route('/')
    .get(function(req, res) {
      res.render('book/booksList', {nav: nav, books: books});
    })
  ;

  bookRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('book/book', {nav: nav, book: books[id]});
    })
  ;

  return bookRouter;
};

module.exports = router;
