const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/',controllers.army.get);

router.post('/',auth(), controllers.army.post);

// router.post('/:id',auth(), controllers.army.post);

router.put('/:id', auth(), controllers.army.put);

router.delete('/:id', auth(), controllers.army.delete);

module.exports = router;