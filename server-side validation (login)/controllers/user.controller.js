var db = require('../db')
const shortid = require('shortid')

module.exports.index = function (req, res) {
    res.render('users/users', {
        users: db.get('users').value()
    })
};

module.exports.search = function (req, res) {
    var name = req.query.q;
    var userMatched = db.get('users').value().filter(function (value) {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('users/users', {
        users: userMatched,
        inputs: name
    });

};

module.exports.creat = function (req, res) {
    res.render('users/creat');
};

 module.exports.postCreat = function (req, res) {
    req.body.id = shortid.generate();
    var non_input = [];
    if (!req.body.name){
        non_input.push("Name is require!");
    }
    if (!req.body.phone) {
        non_input.push("Phone is require!");
    }
    console.log(non_input)
    if (non_input.length) {
        res.render('users/creat',{
            request : non_input,
            value : req.body
        });
        return
 
    }
    db.get('users').push(req.body)
         .write();
    res.redirect('/users');
};

module.exports.view = function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    console.log(id);
    console.log(user);

    res.render('users/view', {
        users: user
    });
};
