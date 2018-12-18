var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('Splashscreen.html', { root: "./public"});
});

router.get('/play', function(req, res) {
  res.sendFile('Gamescreen.html', { root: "./public"});
});

module.exports = router;
