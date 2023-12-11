const router = require('express').Router();

router.use('/admin', require('./adminRoute.js'));
router.use('/parent', require('./parentRoute.js'));
router.use('/instructor', require('./instructorRoute.js'));
router.use('/demo', require('./demoRoute.js'))

module.exports = router;