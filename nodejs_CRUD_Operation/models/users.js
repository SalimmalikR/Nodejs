const connection = require('../config/db')

const usercontroller = require('../controllers/usercontroller')

const bcrypt = require('bcrypt')

class usermodel {

    //read
    static getuser(req, res) {

        return new Promise(resolve => {
            connection.query('select * from customer', [], (err, result) => {
                if (!err)
                    resolve(result);
            })
        })
    }

    //create
    static async addnewuser(username, hashpassword) {

        let create = await connection.query('insert into customer values(?,?)', [username, hashpassword])
        if (create == true)
            return true
        else
            return false
    }

    //update
    static updatenewuser(username, password) {

        return new Promise(resolve => {
            connection.query('UPDATE customer SET password=? where username=?', [password, username], (err, results, field) => {
                if (err)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }

    //delete
    static deleteuser(username) {

        return new Promise(resolve => {
            connection.query('DELETE from customer where username=?', [username], (err, results, field) => {
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
            const sql = 'SELECT * FROM customer WHERE username = ?';
            connection.query(sql, [username], (err, results) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    resolve("error");
                    return;
                }
                if (results.length === 0) {
                    resolve('User not found');
                    return results;
                }

                const user = results[0];
                console.log(user);
                // Compare passwords
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        resolve('password error')
                        return;
                    }

                    if (isMatch) {
                        resolve('Login successful');
                    } else {
                        resolve('Invalid password');
                    }
                });
            })
        })
    }
}
module.exports = usermodel