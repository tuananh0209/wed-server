const express = require('express');
const validate = require('../validate/user.validate')
const validateAuth = require('../validate/auth.validate')

var router = express.Router();

const controller = require('../controllers/user.controller')

router.get('/',  controller.index)

// router.get('/cookie', function(req , res , next){
//     res.cookie('user-id', 12345);
//     res.send();
// })

router.get('/search', controller.search)

router.get('/creat', controller.creat)

router.post('/creat', validate.postCreat , controller.postCreat);

router.get('/:id', controller.view)

module.exports = router