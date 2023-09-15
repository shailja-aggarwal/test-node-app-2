const express = require("express");
var app = express();

//code is executed as per lines if we want to write the app.use at end then first route will execute and then logger is called

app.use(logger)

//app.use('/', auth)

app.get('/', (req, res) =>{
    console.log("Home page")
    res.send('homepage')
})

app.get('/users', auth, (req, res) =>{
    if(req.admin){
        res.send('users is admin')
    }
    else {
        res.send('normal')
    }
   
})

function logger(req, res, next){
    console.log("logged")
    next()
}

function auth(req, res, next){
    if(req.query.admin){
        console.log("authenticated")
        req.admin = true
        next()
    } else {
        res.send('Invalid user')
    }

}

app.listen(3000)