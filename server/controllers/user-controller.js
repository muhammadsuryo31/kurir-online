const { User } = require("../models")
const { compare } = require("../helpers/hasher")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static postRegister (req, res, next) {
    const {email, password, nama, telephone } = req.body
    const newUser = {
      email,
      password,
      nama,
      telephone: +telephone,
      role: 'user'
    }
    User.create(newUser)
      .then(user=> {
        res.status(201).json({
          msg: "register success",
          id: user.id,
          email: user.email,
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static postLogin(req, res, next){
    const { email, password } = req.body
    User.findOne({where:{email}})
      .then(user => {
        if (!user) {
          let err = {name: "badRequest", message: "invalid email or password"}
          next(err)
        } else {
          const comparedPassword = compare(password, user.password)
          if (!comparedPassword){
            let err = {name: "badRequest", message: "invalid email or password"}
            next(err)
          } else {
            const access_token = generateToken({
              id: user.id,
              email: user.email,
              name: user.name,
              telephone: user.telephone,
              role: user.role
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

module.exports = UserController