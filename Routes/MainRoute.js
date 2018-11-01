let router = require('express').Router();
let MyError = require('../ControllerError/MyError');

router.get('/', (req, res, next)=>{
    try {
     res.redirect('/api/sects')

    } catch (e) {
        next(new MyError(e.message, 500))
    }
  });


module.exports = router;