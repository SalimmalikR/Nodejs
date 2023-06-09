const express=require('express')

const {readuser,createuser,updateuser,deleteuser}=require('../controllers/controller')

const upload=require('../middleware/upload')

const router=require('express').Router()

//read
router.get('/read',readuser)

//create
router.post('/create',createuser)

//update
router.put('/update/:userid',upload.single("files"),updateuser)

//delete
router.delete('/delete/:userid',deleteuser)


module.exports=router

