'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alamat_asal: {
        type: Sequelize.STRING
      },
      alamat_tujuan: {
        type: Sequelize.STRING
      },
      nama_penerima: {
        type: Sequelize.STRING
      },
      telephone_penerima: {
        type: Sequelize.BIGINT
      },
      tanggal: {
        type: Sequelize.DATE
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      jenis_barang: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      berat: {
        type: Sequelize.INTEGER
      },
      estimasi_harga: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      DriverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Drivers",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Jobs');
  }
};