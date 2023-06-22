const UserImage = require('../../model/images');
const CustomError = require('../../utils/customerr');

class ImageService {
  async deleteImage(id, imageName, req) {
    const imageUrl = `${req.protocol}://${req.get('host')}/${imageName}`;

    const existingImage = await UserImage.findOne({
      where: {
        id: id,
        img_url: imageUrl,
      },
    });

    if (!existingImage) {
      throw new CustomError(404, 'Image not found for the specified user');
    }

    await existingImage.destroy();
  }
}

module.exports = new ImageService();
