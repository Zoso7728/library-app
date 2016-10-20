var express = require('express');
var mongodb = require('mongodb').MongoClient;
var authRouter = express.Router();
var passport = require('passport');

var router = function() {
  var url = 'mongodb://localhost:27017/libraryApp';

  authRouter.route('/signUp')
    .post(function(req, res) {
      console.log(req.body);

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        var user = {
          username: req.body.userName,
          password: req.body.password
        };

        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/books');
          });
        });
      });
    })
  ;

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/auth/login'
    }), function(req, res) {
      res.redirect('/books');
    })
  ;

  authRouter.route('/login')
    .get(function(req, res) {
      res.render('login/login');
    })
  ;

  authRouter.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/auth/login');
    })
  ;

  authRouter.route('/profile')
    .all(function(req, res, next) {
      if (!req.user) {
        res.redirect('/auth/login');
      }

      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    })
  ;

  return authRouter;
};

module.exports = router;
