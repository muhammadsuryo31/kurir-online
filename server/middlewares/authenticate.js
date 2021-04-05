const { decoder } = require("../helpers/jwt")
const { User } = require("../models")

function authenticate (req, res, next) {
    try {
        const access_token = req.headers.access_token;
        const decoded = decoder(access_token)
        User.findOne({where:{email:decoded.email}})
            .then (user => {
                if (user){
                    if (user.role === 'user') {
                        req.decoded = decoded
                        next();
                    } else {
                        let err = {name: "invalidToken", message: "silahkan gunakan akun user"}
                        next(err)
                    }
                } else {
                    let err = {name: "invalidToken", message: "invalid token"}
                    next(err)
                }
            }).catch(err =>{
                next(err)
            } )
    }
    catch (error) {
        let err = {name: "invalidToken", message: "invalid token"}
        next(err)
    }
}

module.exports = authenticate