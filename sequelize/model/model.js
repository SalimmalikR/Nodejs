const sequelize = require('../config/db')

const { DataTypes } = require('sequelize')

//Table Creation
const user = sequelize.define('userdetail', {

    userid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

sequelize.sync({ alter: true }).then(() => {
    console.log('Table and Model sync Suuccessfully');
}).catch((err) => {
    console.log('Error in Table sync');
})

module.exports=user

