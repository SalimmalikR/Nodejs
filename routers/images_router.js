const express = require('express')

const router = express.Router();

//multer

const upload = require('../middleware/multer')

//authorization

const auth = require('../auth/jwt')

//require

const update = require('../controllers/image_controller/update')

const deleteimg = require('../controllers/image_controller/delete')

//router

router.patch('/:imageName/:id', auth, update)

router.delete('/:imageName/:id', auth, deleteimg)

module.exports = router