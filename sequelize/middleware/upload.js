const multer=require('multer')

const path=require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'files');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  console.log(storage);
  var uploadFile = multer({ storage: storage });
  module.exports = uploadFile;