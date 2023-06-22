const express = require('express')

const router = express.Router();

//multer

const upload = require('../middleware/multer')

//require

const preview=require('../controllers/preview/preview')

const extract =require('../controllers/pdf_extract_controller/extract')

//routers

router.get('/:imageName',preview)

router.post('/extractimg',upload,extract)

module.exports =router;