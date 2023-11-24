'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM(["seen","unseen"])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      // ,
      // transaction_id:{
      //   type:Sequelize.INTEGER,
      //   allowNull:false,
      //   references:{
      //     model:"Transactions",
      //     key:"id"
      //   },
      //   onUpdate:"CASCADE",
      //   onDelete:"CASCADE"
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};