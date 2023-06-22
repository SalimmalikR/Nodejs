const { convert } = require('pdf-poppler');
const path = require('path');
const CustomError = require('../../utils/customerr');

const extract = async (req, res, next) => {
  try {
    const pdfFile = req.files[0];
    if (!pdfFile) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    const pdfPath = pdfFile.path;

    const imagePath = path.join(__dirname, '..', '..', 'images', 'extracted_img');

    const options = {
      format: 'jpeg',
      out_dir: imagePath,
      out_prefix: 'image',
      page: null
    };

    let result;
    try {
      result = await convert(pdfPath, options);
    } catch (error) {
      console.error(error);
      const err = new CustomError(500, 'Error converting PDF to images');
      return next(err);
    }

    const imageFiles = Array.isArray(result)
      ? result.map((pageResult, index) => ({
          filename: `image${index + 1}.jpeg`,
          path: path.join(imagePath, `image${index + 1}.jpeg`)
        }))
      : [];

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'Successfully converted PDF to images',
    });
  } catch (error) {
    console.error(error);
    const err = new CustomError(500, 'Error converting PDF to images');
    return next(err);
  }
};

module.exports = extract;
