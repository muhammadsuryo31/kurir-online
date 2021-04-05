const { Driver } = require("../models")
const { compare } = require("../helpers/hasher")
const { generateToken } = require("../helpers/jwt")

class DriverController {
  static postRegister (req, res, next) {
    const {email, password, nama, telephone } = req.body
    const newUser = {
      email,
      password,
      nama,
      telephone: +telephone,
      role: 'driver'
    }
    Driver.create(newUser)
      .then(driver=> {
        res.status(201).json({
          msg: "register success",
          id: driver.id,
          email: driver.email,
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static postLogin(req, res, next){
    const { email, password } = req.body
    Driver.findOne({where:{email}})
      .then(driver => {
        if (!driver) {
          let err = {name: "badRequest", message: "invalid email or password"}
          next(err)
        } else {
          const comparedPassword = compare(password, driver.password)
          if (!comparedPassword){
            let err = {name: "badRequest", message: "invalid email or password"}
            next(err)
          } else {
            const access_token = generateToken({
              id: driver.id,
              email: driver.email,
              name: driver.name,
              telephone: driver.telephone,
              role: driver.role
            })
            res.status(200).json({access_token})
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = DriverController