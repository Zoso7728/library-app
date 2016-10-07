var express = require('express');

var authorRoutes = express.Router();

var router = function(nav) {
  var authors = [
    {
      name: 'Patrick Rothfuss'
    },
    {
      name: 'Dan Brown'
    },
  ];

  authorRoutes.route('/')
    .get(function(req, res) {
      res.render('author/authorsList', {nav: nav, authors: authors});
    })
  ;

  authorRoutes.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('author/author', {nav: nav, author: authors[id]});
    })
  ;

  return authorRoutes;
};

module.exports = router;
