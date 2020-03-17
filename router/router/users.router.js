const express = require('express');
var router = express.Router();
const shortid = require('shortid')

const db = require('../db')

router.get('/', function (req, res) {
    res.render('users/users', {
        users: db.get('users').value()
    })
})

router.get('/search', function (req, res) {
    var name = req.query.q;
    var userMatched = db.get('users').value().filter(function (value) {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('users/users', {
        users: userMatched
    });

})

router.get('/creat', function (req, res) {
    res.render('users/creat');
})

router.post('/creat', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body)
        .write();
    res.redirect('/users');
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    console.log(id);
    console.log(user);

    res.render('users/view', {
        users: user
    });
})

module.exports = router