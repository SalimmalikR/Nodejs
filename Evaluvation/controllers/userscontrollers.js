const connection = require('../config/usersdb')

const usermodel = require('../model/usermodel')

const jwt = require('jsonwebtoken')


//get user
const getuser = async (req, res) => {
    let results = await usermodel.getuser();

    if (results)
        res.json(results)

}

//For register
const registeruser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let create = await usermodel.addnewuser(username, password)
    try {
        res.send('Successfully Registered')
    } catch (err) {
        res.send('failed')
    }
};

//For Update

const updateuser = async (req, res) => {

    let update = await usermodel.updatenewuser()
    res.send(update)
}

//For delete
const deleteuser = async (req, res) => {
    const username = req.params.username;

    let deleted = await usermodel.deleteuser(username)
    if (deleted)
        res.send('Data Deleted Successfully')
    else
        res.send('Failed to Delete')
}

//login
const login=async (req,res)=>{
    const {username,password}=req.body

        let loginuser=await usermodel.loginuser(username,password)
        res.send(loginuser)
};

module.exports = {
    getuser,
    registeruser,
    updateuser,
    deleteuser,
    login
}
