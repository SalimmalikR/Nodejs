const express=require('express')

const {readuser,createuser,updateuser,deleteuser}=require('../controllers/usercontroller')

const router=require('express').Router()

//read
router.get('/read',readuser)

//create
router.post('/create',createuser)

//update
router.put('/update/:id',updateuser)

//delete
router.delete('/delete/:id',deleteuser)

module.exports=router

