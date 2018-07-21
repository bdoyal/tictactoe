var express = require('express');
var router = express.Router();

router.get('/games', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/games', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/games/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/games/:id', function(req, res, next) {
  res.send('respond with a resource');
});


  

module.exports = router;