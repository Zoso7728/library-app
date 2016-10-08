var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();

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

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
          db.close();
        });
      });
    })
  ;

  return adminRouter;
};

module.exports = router;
