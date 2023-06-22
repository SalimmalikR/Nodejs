const db = require('../config/database');
const { DataTypes } = require('sequelize');
const Users = require('../model/users');
const content = require('./content');
const result = db.define('result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
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
  tableName: 'result',
  timestamps: false,
});

result.belongsTo(Users, { foreignKey: 'userId' });
result.belongsTo(content, { foreignKey: 'contentId' });

Users.hasMany(result, { foreignKey: 'userId' });
content.hasMany(result, { foreignKey: 'contentId' });

module.exports = result;
