const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..','images', 'uploads'));
    console.log('destination');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log(file);
  },
});

const upload = multer({ storage }).array('files', 4);

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;
