const mysql=require('mysql')

//db connections
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root12345',
    database:'crud_operation'
})

con.connect(function(err){
    if(err)throw err
    console.log('db connected!');
})

module.exports=con