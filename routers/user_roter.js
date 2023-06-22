const express = require('express')

const router = express.Router();

//Authrorization

const auth = require('../auth/jwt')

//require
const createuser = require('../controllers/users_controller/create')

const updateuser = require('../controllers/users_controller/update')

const deleteuser = require('../controllers/users_controller/delete')

const getuser = require('../controllers/users_controller/readall');

const login = require('../controllers/login/admin_login');

//routers

router.post('/createuser', auth, createuser)

router.patch('/updateuser/:id', auth, updateuser)

router.delete('/deleteuser/:id', auth, deleteuser)

router.get('/readuser/:id', getuser)

router.post('/login', login)

module.exports = router;