let router = require('express').Router();
let MembersController = require('../Controllers/Members-controller');

router.route('/')
    .get(MembersController.get)
    .post(MembersController.post);
router.route('/:id')
    .get(MembersController.getId);
router.post('/update/:id', MembersController.put);
router.get('/delete/:id', MembersController.delete);
module.exports = router;