const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');


router.get('/', controllers.base.get.all);
router.get('/factory/:id',auth(), controllers.base.get.ownerFactory);
router.get('/army/:id',auth(), controllers.base.get.ownerArmy);


router.post('/army',auth(), controllers.base.post.addUnit);

router.post('/factory',auth(), controllers.base.post.addFactory);


// router.put('/:id', auth(), controllers.base.put);

// router.delete('/:id', auth(), controllers.base.delete);

module.exports = router;