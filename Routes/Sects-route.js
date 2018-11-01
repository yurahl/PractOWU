let SectsController = require('../Controllers/Sects-controller');
let router = require('express').Router();

router.route('/')
    .get(SectsController.get)
    .post(SectsController.post);
router.route('/:id')
    .get(SectsController.getId);

router.post('/update/:id', SectsController.put);
router.get('/delete/:id', SectsController.delete);

module.exports = router;