var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/controller');
router.get('/:permalink',controller.single);

router.get('/',controller.index);

router.post('/add',controller.add);
router.get('/edit/:permalink',controller.edit);
router.post('/edit/:permalink',controller.save);
router.get('/delete/:permalink',controller.delete);


module.exports = router;
