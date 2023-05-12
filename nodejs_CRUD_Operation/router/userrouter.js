const express=require('express')

const {readuser,createuser,updateuser,deleteuser,login}=require('../controllers/usercontroller')

const router=require('express').Router()

//read
router.get('/read',readuser)

//create
router.post('/create',createuser)

//update
router.put('/update/:username',updateuser)

//delete
router.delete('/delete/:username',deleteuser)

//login
router.post('/login',login)

module.exports=router

