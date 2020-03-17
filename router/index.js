const express = require('express');
const bodyParser = require('body-parser')

const userRouter = require('./router/users.router')
const db = require('./db')

const app = express();
const port = 3000;

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/',function(req , res){
    res.render('index');
});

app.use('/users', userRouter);

app.listen(port , function(){
    console.log("port: " + port);
})