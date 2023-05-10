//Express
const express= require('express')

//json web Token
const jwt=require('jsonwebtoken')

//Body Parser
const bodyParser = require('body-parser')

const app=express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

const users=require("./users.json")

//post
app.post('/login',function(req,res){
    //Verifying the username
    const user=users.find((usr)=> usr.username===req.body.username);
    if(user){
        //if it's true it check the password
        if(user.password===req.body.password){
            //creating the secret code
            const token=jwt.sign({password:user.password},"nwodinownwcmowmcowcowcowwomomvw$%2&Whbds")
            res.status(200).send('Accessed...All fields are correct!')
        }
        else{
            res.status(401).send('Access denied. Give the correct field')
        }
    }
    else{
        res.status(401).send('Access denied. User not found')
    }
})


//get
app.get('/getinfo',function(req,res){
    res.json(users)
})

//port
app.listen(5000)
console.log('port running......');