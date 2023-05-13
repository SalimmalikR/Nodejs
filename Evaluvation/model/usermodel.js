const connection = require('../config/usersdb')

const userscontrollers = require('../controllers/userscontrollers')

const jwt = require('jsonwebtoken')

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
    static updatenewuser() {

        return new Promise(resolve => {
            verifyToken, (req, res, next) => {
                const { username } = req.params;
                const { password } = req.body;

                const query = `UPDATE users SET password='${password}' WHERE username=${username}`;
                connection.query(query, (err, results) => {
                    if (err) {
                        return resolve('Error querying MySQL:', err);
                    }

                    if (results.affectedRows === 0) {
                        return resolve('User not found');
                    }
                    return resolve('User information updated successfully');
                });
            }
        });


        // Verify JWT token 
        function verifyToken(req, res, next) {
            const token = req.headers["authorization"];
            if (token) {
                jwt.verify(token, "secret", (err, decoded) => {
                    if (err) {
                        res.status(401).send('Access denied=> wrong token');
                        return;
                    }
                    else {
                        req.password = decoded.password;
                        next();
                    }
                })
            }
            else {
                res.status(401).send('Access denied!');
            }
        }
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