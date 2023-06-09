const connection = require('../config/usersdb')

const userscontrollers = require('../controllers/userscontrollers')

const jwt = require('jsonwebtoken')

const update = require('../middleware/update')

class usermodel {

    //read
    static getuser(req, res) {

        return new Promise(resolve => {
            connection.query('select * from userdatas', [], (err, result) => {
                if (!err)
                    resolve(result);
            })
        })
    }

    //create
    static async addnewuser(username, password) {

        let create = connection.query('insert into userdatas values(?,?)', [username, password])
        if (create == true)
            return true
        else
            return false
    }

    //update
    static updatenewuser(username, password) {
        return new Promise(resolve => {
            connection.query('UPDATE userdatas SET password=? WHERE username=?',[password,username], (err,results) => {
                if (err) {
                    resolve('Error querying MySQL:', err);
                }

                if (results=== 0) {
                    resolve('User not found');
                }
                resolve('User information updated successfully');
            });
        });
    }

    //delete
    static deleteuser(username) {

    return new Promise(resolve => {
        connection.query('DELETE from userdatas where username=?', [username], (err, results, field) => {
            if (err)
                resolve(false)
            else
                resolve(true)
        })
    })
}

    //login
    static async loginuser(username, password) {

    return new Promise(resolve => {

        // Find the user with the provided username and password
        const query = `SELECT * FROM userdatas WHERE username='${username}' AND password='${password}'`;
        connection.query(query, (err, results) => {
            if (err) {
                return resolve('Error in query');
            }
            if (results.length === 0) {
                return resolve('Invalid username or password');
            }
            // Generate a JWT token
            const token = jwt.sign({ username: results[0].username }, 'secret', { expiresIn: '10m' });
            return resolve({ token });
        });
    })
}
}
module.exports = usermodel