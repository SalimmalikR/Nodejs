const db=require('../config/database')

const {DataTypes}=require('sequelize')

const users=db.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize:db,
    modelName: 'Users',
    freezeTableName: true,
    timestamps: false,
})

module.exports =users