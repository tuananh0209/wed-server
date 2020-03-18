const db = require('../db')

module.exports.login = function(req , res){
    res.render('auth/login');
};

module.exports.postLogin = function(req , res){
    var userName = req.body.name;   
    var user = db.get('users').find({ name : userName}).value();

    res.cookie('userId', user.id);
    res.redirect('/users');

}

