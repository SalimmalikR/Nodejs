const Content = require('../../model/content');
const Image = require('../../model/images');

class ContentService {
  async readContentWithImages(contentId) {
    return await Content.findAll({
      where: { id: contentId },
      include: Image,
    });
  }
}

module.exports = ContentService;
