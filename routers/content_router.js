const express = require('express')

const router = express.Router();

//middleware

const upload = require('../middleware/multer')

//authorization

const auth = require('../auth/jwt')

//reqire

const create_content = require('../controllers/content_controller/create')

const update_content = require('../controllers/content_controller/update')

const deleteContent = require('../controllers/content_controller/delete')

const read_content = require('../controllers/content_controller/read')

//routers

router.post('/create', auth, upload, create_content)

router.patch('/update/:id', auth, update_content)

router.delete('/delete/:id', auth, deleteContent)

router.get('/read/:id', read_content)

module.exports = router