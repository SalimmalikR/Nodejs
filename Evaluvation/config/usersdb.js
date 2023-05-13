const mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root12345',
    database:'userdb'
})

connection.connect(function(err){
    if(err)throw err
    console.log('db connected!');
})

module.exports=connection