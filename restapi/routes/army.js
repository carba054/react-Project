const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');


router.get('/all', controllers.army.get.all);
router.get('/:id',auth(), controllers.army.get.owner);


router.post('/',auth(), controllers.army.post);

router.put('/:id', auth(), controllers.army.put);

router.delete('/:id', auth(), controllers.army.delete);

module.exports = router;