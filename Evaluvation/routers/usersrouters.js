const express=require('express')

const app=express()

app.use(express.json())

const {getuser,registeruser,deleteuser, login,updateuser}=require('../controllers/userscontrollers')

const router=require('express').Router()

const update=require('../middleware/update')

const usermodel = require('../model/usermodel')

//read
router.get('/getuser',getuser)

//create
router.post('/register',registeruser)

//update
router.put('/update/:username',update,updateuser)

//delete
router.delete('/delete/:username',deleteuser)

//login
router.post('/login', login)

module.exports=router



