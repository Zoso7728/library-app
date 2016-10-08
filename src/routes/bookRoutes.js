var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var bookRouter = express.Router();

var router = function(nav) {
  var url = 'mongodb://localhost:27017/libraryApp';

  bookRouter.use(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }

    next();
  })

  bookRouter.route('/')
    .get(function(req, res) {
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        var books = collection.find({}).toArray(function(err, results) {
          res.render('book/booksList', {nav: nav, books: results});
        });
      });
    })
  ;

  bookRouter.route('/:id')
    .get(function(req, res) {
      var id = new ObjectId(req.params.id);

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.findOne({_id: id}, function(err, results) {
          res.render('book/book', {nav: nav, book: results});
        });
      });
    })
  ;

  return bookRouter;
};

module.exports = router;
