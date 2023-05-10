const express=require('express')

const bodyparser=require('body-parser')

const con=require('./config/db')

const app=express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended: false}));

const router=require('./router/userrouter')

app.use(router)

app.listen(5000)
console.log('port 5000 is running');