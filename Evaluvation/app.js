const express=require('express')

const app=express()

const connection=require('./config/usersdb')

const jwt=require('jsonwebtoken')

const bodyparser=require('body-parser')

const router = require('./routers/usersrouters')

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:false}))

app.use(router)

app.listen(3000)
console.log('Port 3000 is Running.......');