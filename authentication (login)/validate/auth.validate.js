const db = require('../db')

module.exports.postLogin = function(req , res , next){
    var userName = req.body.name;
    var pass = req.body.pass;
    
    var user = db.get('users').find({ name : userName}).value();
    
    if (!user){
        res.render('auth/login',{
            error : [
                'Name does not exist!' 
            ],
            value : req.body
        });
        return;
    }

    if (user.pass !== pass){
        res.render('auth/login',{
            error: [
                'Wrong password!'
            ],
            value : req.body
        });
        return;
    }
    next();
}

module.exports.requestAuth = function(req , res , next){
    if(!req.cookies.userId){
        res.redirect('auth/login');
        return;
    }
    var user = db.get('users').find({id: req.cookies.userId}).value();

    if(!user){
        res.redirect('auth/login');
        return;
    }
    next();
}