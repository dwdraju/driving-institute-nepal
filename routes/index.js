var express = require('express');
	router = express.Router(),
	controller = require('../controllers/controller')

router.get('/', controller.index);
router.get('/add', function(req, res){
	res.render('add');	
});
router.post('/add', controller.add);
module.exports = router;