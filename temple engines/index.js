const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(rep , res){
    res.render('index',{
        name : 'aaa'
    });
})

app.get('/users', function(req , res){
    res.render('users/index',{
        users:[
            {id: 1 , name: "ad"},
            {id: 2 , name: "mid"}
        ]
    });
})

app.listen(port, function(){
    console.log("port listen: " + port);
})