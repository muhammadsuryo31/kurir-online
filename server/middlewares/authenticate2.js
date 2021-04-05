const { decoder } = require("../helpers/jwt")
const { Driver } = require("../models")

function authenticate2 (req, res, next) {
    try {
        const access_token = req.headers.access_token;
        const decoded = decoder(access_token)
        Driver.findOne({where:{email:decoded.email}})
            .then (driver => {
                if (driver){
                    if (driver.role === 'driver') {
                        req.decoded2 = decoded
                        next();
                    } else {
                        let err = {name: "invalidToken", message: "silahkan gunakan akun driver"}
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

module.exports = authenticate2