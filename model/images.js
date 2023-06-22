const db = require('../config/database');
const { DataTypes } = require('sequelize');
const content = require('./content');

const Images = db.define('images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: content,
            key: 'id',
        },
    },
}, {
    tableName: 'images',
    timestamps: false,
});

Images.belongsTo(content, { foreignKey: 'contentId' });
content.hasMany(Images, { foreignKey: 'contentId' });

module.exports = Images;
