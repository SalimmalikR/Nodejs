const usermodule=require('../models/users')
//For read
const readuser=async(req,res)=>{
    let results =await usermodule.getuser();

    if(results) 
    res.json(results)
    
}

//For Create
const createuser=async(req, res) => {
    const id=req.body.id;
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    let create=await usermodule.addnewuser(id,username,email,password)
    if(create==true)
    res.send('1row affected. User added successfully')
    else
    res.send('failed')
};

//For Update

const updateuser=async(req,res)=>{
    const id=req.params.id;
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    let update=await usermodule.updatenewuser(id,username,email,password)
    if(update)
    res.send('updated successfully')
    else
    res.send('Failed to update')
}

//For delete
const deleteuser=async (req,res)=>{
    const id=req.params.id;

    let deleted=await usermodule.deleteuser(id)
    if(deleted)
    res.send('Data Deleted Successfully')
    else
    res.send('Failed to Delete')
}

module.exports={
    readuser,
    createuser,
    updateuser,
    deleteuser
}