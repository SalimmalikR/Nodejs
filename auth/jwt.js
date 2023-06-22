const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customerr');

function verifyToken(req, res, next) {
    const token = req.header('jwt');
    if(token){
        jwt.verify(token, 'secretkey', (err,decoded) => {
            if(err){
                const err=new CustomError(404, 'Invalid token')
                next(err);
                return;
            }
            else{
                req.id=decoded.id;
                if(req.id===1)
                next()
                else{
                    return res.status(404).json({
                        statuscode: 404,
                        status:'failed',
                        message:'access denied! user not allowed'
                    })
                }
            }
        });
    }
    else{
        const err = new CustomError(500,'please provide token')
        next(err);
    }
}

module.exports = verifyToken;