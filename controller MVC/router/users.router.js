const express = require('express');
var router = express.Router();

const controller = require('../controllers/user.controller')

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/creat', controller.creat)

router.post('/creat', controller.postCreat);

router.get('/:id', controller.view)

module.exports = router