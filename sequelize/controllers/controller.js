const connection = require('../config/db')

const user = require('../model/model')

//For read
const readuser = (req, res) => {

    user.findAll().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send('error to read')
    })
}


//For Create
const createuser = (req, res) => {
    const { username, password } = req.body

    user.create({
        username,
        password
    }).then(() => {
        res.send('added')
    }).catch((err) => {
        res.send('Error to create')
    })
};

//For Update

const updateuser = async (req, res) => {
    const id = req.params.userid;
    const pass  = req.body.password
    console.log(pass);

    const find = await user.findByPk(id)
    try {
        await user.update({ password: pass }, { where: { userid: id } })
        res.send('updaed successfully')
    } catch (error) {
        res.send('error to update')
    }
}

    //For delete
    const deleteuser = (req, res) => {
        const id = req.params.userid;
        user.destroy({ where: { userid: id } })
            .then(() => {
                res.send('Data Deleted Successfully')
            }).catch((err) => {
                res.send('Error to delete')
            })
    }


    module.exports = {
        readuser,
        createuser,
        updateuser,
        deleteuser
    }