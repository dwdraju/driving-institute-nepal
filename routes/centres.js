var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/controller');
router.get('/:permalink',controller.single);

router.get('/',controller.index);

router.post('/add',controller.add);

module.exports = router;
