let router = require('express').Router();
let MembersRoutes = require('./Members-route');
let SectsRoute = require('./Sects-route');

router.use('/members', MembersRoutes);
router.use('/sects', SectsRoute);
module.exports = router;