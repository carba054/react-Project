const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');


router.get('/', controllers.factory.get);


router.post('/',auth(), controllers.factory.post);

router.put('/:id', auth(), controllers.factory.put);

router.delete('/:id', auth(), controllers.factory.delete);

module.exports = router;