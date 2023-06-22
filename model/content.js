const db = require('../config/database');
const { DataTypes } = require('sequelize');
const users = require('./users');

const content = db.define('content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'content',
  timestamps: false,
});

module.exports = content;
