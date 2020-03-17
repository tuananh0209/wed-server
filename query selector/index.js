const express = require('express');
const app = express();
const port = 3000;

var users = [
    { id: 1 , name: "ad"},
    { id: 2 , name: "mid"}
];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(rep , res){
    res.render('index',{
        name : 'aaa'
    });
})

function getData(value){
    app.get('/users', function(req , res){
        res.render('users/index',{
        users : value  
        });
    });
}

app.get('/users/search' , function(req , res){
    var q = req.query.q;
    var matchedUser = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q) != -1;
    });
    getData(matchedUser);
});

app.listen(port, function(){
    console.log("port listen: " + port);
})
getData(users);
