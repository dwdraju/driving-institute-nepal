var express = require('express');
	router = express.Router(),
	controller = require('../controllers/controller')


/* GET home page. */
router.get('/', controller.index);
/* GET Add page. */
router.get('/add', function(req, res){
	res.render('add');
	
})

router.post('/add', controller.add);
module.exports = router;