var express = require('express');
var router = express.Router();

/* GET Server */
router.get('/', function(req, res, next) {
  res.send('Server Connected...')
});

module.exports = router;
