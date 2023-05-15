const express=require('express')

const {getuser,registeruser,deleteuser, login}=require('../controllers/userscontrollers')

const {updatenewuser}=require('../model/usermodel')

const router=require('express').Router()

const update=require('../middleware/update')



//read
router.get('/getuser',getuser)

//create
router.post('/register',registeruser)

//update
router.put('/update/:username',update,updatenewuser)

//delete
router.delete('/delete/:username',deleteuser)

//login
router.post('/login', login)

module.exports=router



