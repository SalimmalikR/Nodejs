const User = require('../model/users');
const Image = require('../model/images');
const Content = require('../model/content');
const Result = require('./result');
const sequelize = require('../config/database');

const syncTables = async () => {
  try {
    await sequelize.sync();
    console.log({message:'Tables created successfully'});
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
};

module.exports = syncTables;
