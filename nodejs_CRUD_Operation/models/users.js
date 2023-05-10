const con=require('../config/db')

const usercontroller=require('../controllers/usercontroller')


class usermodel{

    //read
    static getuser(req,res){

        return new Promise(resolve =>{
            con.query('select * from customer',[],(err,result)=>{
                if(!err)
                resolve(result);
            })
        })
    }

    //create
    static addnewuser(id,username,email,password){

         return new Promise(resolve =>{
            con.query('insert into customer values(?,?,?,?)',[id,username,email,password],(err,result) => {
                if(!err)
                resolve(true);
                else
                resolve(false)
            })
        })
    }

    //update
    static updatenewuser(id,username,email,password){

        return new Promise(resolve =>{
            con.query('UPDATE customer SET username=?, email=?, password=? where id=?',[username,email,password,id],(err, results,field)=>{
                if(err) 
                resolve(false)
                else
                resolve(true)
            })
       })
   }

   //delete
   static deleteuser(id){

    return new Promise(resolve =>{
        con.query('DELETE from customer where id=?',[id],(err, results,field)=>{
            if(err)
            resolve(false)
            else
            resolve(true)
        })
   })
}
}

module.exports=usermodel