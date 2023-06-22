const content = require('../../model/content');
const Image = require('../../model/images');
const CustomError = require('../../utils/customerr');

const createContentWithImages = async (content1, content2, files, req) => {
  try {
    // Check if the content already exists for the user
    const existingContent1 = await content.findOne({
      where: { content: content1 },
    });

    const existingContent2 = await content.findOne({
      where: { content: content2 },
    });

    if (existingContent1) {
      throw new CustomError(400, 'Content 1 already exists');
    }

    if (existingContent2) {
      throw new CustomError(400, 'Content 2 already exists');
    }

    // Create the content entries
    const con1 = await content.create({ content: content1 });
    const con2 = await content.create({ content: content2 });

    // Create the base image URL
    const baseImageUrl = `${req.protocol}://${req.get('host')}/`;

    // Process the uploaded images
    const imagesPromises = [];

    // Create two images for content1
    for (let i = 0; i < 2; i++) {
      const file = files[i];

      const image = await Image.create({
        img_url: `${baseImageUrl}${file.filename}`,
        contentId: con1.id,
      });

      imagesPromises.push(image);
    }

    // Create two images for content2
    for (let i = 2; i < 4; i++) {
      const file = files[i];

      const image = await Image.create({
        img_url: `${baseImageUrl}${file.filename}`,
        contentId: con2.id,
      });

      imagesPromises.push(image);
    }

    // Wait for all image creation promises to resolve
    const createdImages = await Promise.all(imagesPromises);

    return {
      content: [con1, con2],
      images: createdImages,
    };
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

module.exports = { createContentWithImages };
