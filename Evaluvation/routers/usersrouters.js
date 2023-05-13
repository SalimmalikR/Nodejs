const express=require('express')

const {getuser,registeruser,updateuser,deleteuser, login}=require('../controllers/userscontrollers')

const router=require('express').Router()

//read
router.get('/getuser',getuser)

//create
router.post('/register',registeruser)

//update
router.put('/update/:username',updateuser)

//delete
router.delete('/delete/:username',deleteuser)

//login
router.post('/login', login)

module.exports=router

