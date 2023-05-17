const express=require('express')

const app=express()

const model=require('./config/db')

const sequelize=require('./model/model')

const router=require('./router/routers')

app.use(express.json())

app.use(router)

app.listen(3000)
console.log('port 3000 is running....');