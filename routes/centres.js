var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/controller');
router.get('/:id',controller.each);

router.get('/',controller.index);

router.post('/add',controller.add);

module.exports = router;
