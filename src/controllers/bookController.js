var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/libraryApp';

var bookController = function(bookService, nav) {
  var middleware = function(req, res, next) {
    if (!req.user) {
      res.redirect('/auth/login');
    }

    next();
  };

  var getIndex = function(req, res) {
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      var books = collection.find({}).toArray(function(err, results) {
        res.render('book/booksList', {nav: nav, books: results});
      });
    });
  };

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.findOne({_id: id}, function(err, results) {
        if (results.bookId) {
          bookService.getBookById(results.bookId, function(err, book) {
            results.book = book;
              res.render('book/book', {nav: nav, book: results});
          });
        } else {
          res.render('book/book', {nav: nav, book: results});
        }
      });
    });
  };

  return {
    middleware: middleware,
    getIndex: getIndex,
    getById: getById
  };
};

module.exports = bookController;
