const express = require('express')

const router = express.Router();

//authorization

const auth = require('../auth/jwt')

//require

const readallusers =require('../controllers/result_controller/readall')

const create = require('../controllers/result_controller/create');

const updateresult = require('../controllers/result_controller/update')

const readusers = require('../controllers/result_controller/read');

const deleteContent=require('../controllers/result_controller/content_delete');

const deleteUser = require('../controllers/result_controller/user_delete');

//routing

router.get('/readall',auth,readallusers)

router.post('/createresult',auth,create)

router.put('/resultupdate/:id',auth,updateresult)

router.get('/mapreadusers/:id',readusers)

router.delete('/content/:id/:contentId',auth,deleteContent)

router.delete('/userdelete',auth,deleteUser)

module.exports =router