const Content = require('../../model/content');
const Image = require('../../model/images');
const CustomError = require('../../utils/customerr');

class ContentService {
  async deleteContent(id) {
    const content = await Content.findByPk(id);

    if (!content) {
      throw new CustomError(404, 'Content not found');
    }

    const images = await Image.findAll({ where: { contentId: id } });

    await Image.destroy({ where: { contentId: id } });

    await Content.destroy({ where: { id: id } });
  }
}

module.exports = ContentService;
