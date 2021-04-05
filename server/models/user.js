'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/hasher')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Job, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {type: DataTypes.STRING,
      validate: {
        isEmail: {msg: "email cannot be empty and should use email format"},
      },
      unique : {
        args: true,
        msg: "email already registred"
      }},
    password: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "password cannot be empty"}
      }},
    nama: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "name cannot be empty"}
      }},
    telephone: {type:DataTypes.BIGINT,
      validate: {
        len: {
          args: [10,12],
          msg: 'phone number should not be empty and should be between 10 to 12 digit'
        }
      }},
    role: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "role cannot be empty"}
      }}
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};