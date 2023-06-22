const path = require('path');
const CustomError = require('../../utils/customerr');

const preview = (req, res, next) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', '..', 'images', 'extracted_img', imageName);

  // Set the appropriate content type in the response headers
  res.set('Content-Type', 'image/jpeg');

  // Send the file to the client
  res.sendFile(imagePath, (error) => {
    if (error) {
      const err = new CustomError(404, 'Image not found');
      return next(err);
    }
  });
};

module.exports = preview;
