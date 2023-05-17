const Sequelize = require('sequelize')

const sequelize = new Sequelize ('sequelize', 'root', 'root12345', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('DB successfully Connected!');
}).catch((err)=>{
    console.log('Failed to Connect');
})

module.exports=sequelize