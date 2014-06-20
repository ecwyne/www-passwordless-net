var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { validation: req.flash('validation')[0], error: req.flash('error')[0], homepage: true });
});

/* GET home page. */
router.get('/getstarted', function(req, res) {
	res.render('getstarted', { validation: req.flash('validation')[0], error: req.flash('error')[0] });
});

module.exports = router;