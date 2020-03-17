const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')
const shortid = require('shortid')
// const multer = require('multer') // v1.0.5
// const upload = multer() // for parsing multipart/form-data
const adapter = new FileSync('db.json')
const db = low(adapter)
const app = express();
const port = 3000;

db.defaults({
        users:[]
    })
    .write()

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/',function(req , res){
    res.render('index');
});

app.get('/users', function(req , res){
    res.render('users/users',{
        users: db.get('users').value()
    })
})

app.get('/users/search',function(req , res){
    var name = req.query.q;
    var userMatched = db.get('users').value().filter(function(value){
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('users/users',{
        users : userMatched
    });
    
})

app.get('/users/creat', function(req , res){
    res.render('users/creat');
})

app.post('/users/creat',function(req , res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body)
    .write();
    res.redirect('/users');
});

app.get('/users/:id',function(req , res){
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    console.log(id);
    console.log(user);
    
    res.render('users/view' , {
        users : user
    });
})

app.listen(port , function(){
    console.log("port: " + port);
})