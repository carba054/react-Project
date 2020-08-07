const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.units.get);

router.post('/',auth(), controllers.units.post);//

router.put('/:id', auth(), controllers.units.put);

router.delete('/:id', auth(), controllers.units.delete);

module.exports = router;