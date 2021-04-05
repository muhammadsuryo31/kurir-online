'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {foreignKey: 'UserId'})
      Job.belongsTo(models.Driver, {foreignKey: 'DriverId'})
    }
  };
  Job.init({
    alamat_asal: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "alamat asal cannot be empty"}
      }},
    alamat_tujuan: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "alamat tujuan cannot be empty"}
      }},
    nama_penerima: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama penerima cannot be empty"}
      }},
    telephone_penerima: {type:DataTypes.BIGINT,
      validate: {
        notEmpty: {msg: "nomor telepon penerima cannot be empty"}
      }},
    tanggal: {type:DataTypes.DATE},
    nama_barang: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama barang cannot be empty"}
      }},
    jenis_barang: {type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "jenis barang cannot be empty"}
      }},
    jumlah: {type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "jumlah cannot be empty or bellow zero"},
        min : 0
      }},
    berat: {type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "berat cannot be empty or bellow zero"},
        min : 0
      }},
    estimasi_harga: {type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "biaya cannot be empty or bellow zero"},
        min : 0
      }},
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};