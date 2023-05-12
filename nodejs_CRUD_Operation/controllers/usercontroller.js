const connection = require('../config/db')

const usermodule=require('../models/users')

const bcrypt= require('bcrypt')

//For read
const readuser=async(req,res)=>{
    let results =await usermodule.getuser();

    if(results) 
    res.json(results)
    
}

//For Create
const createuser=async(req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const hashpassword=await bcrypt.hash(password, 5);
    console.log(hashpassword);

    let create=await usermodule.addnewuser(username,hashpassword)
    try{
        res.send('1 row affected')
    }catch(err){
        res.send('failed')
    }
};

//For Update

const updateuser=async(req,res)=>{
    const username=req.params.username;
    const password=req.body.password;

    let update=await usermodule.updatenewuser(username,password)
    if(update)
    res.send('updated successfully')
    else
    res.send('Failed to update')
}

//For delete
const deleteuser=async (req,res)=>{
    const username=req.params.username;

    let deleted=await usermodule.deleteuser(username)
    if(deleted)
    res.send('Data Deleted Successfully')
    else
    res.send('Failed to Delete')
}

//login
const login=async (req,res)=>{
    const {username,password}=req.body

        let loginuser=await usermodule.loginuser(username,password)
        res.send(loginuser)
}

module.exports={
    readuser,
    createuser,
    updateuser,
    deleteuser,
    login
}