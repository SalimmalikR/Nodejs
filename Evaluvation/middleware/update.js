const jwt = require('jsonwebtoken')

const update = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {

            try {
                req.username = decoded.username;
                res.send('correct token')
                next();
            }
            catch (err) {
                res.status(401).send('Access denied=> wrong token');
                return;
            }

        })
    }
}
module.exports = update