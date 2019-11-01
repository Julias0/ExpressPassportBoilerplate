var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated());
  if(req.user) {
    res.send(req.user);
  } else {
    res.send('respond with a resource');
  }
});

module.exports = router;
