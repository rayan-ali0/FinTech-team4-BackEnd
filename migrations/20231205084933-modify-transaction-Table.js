'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Transactions','status',{
      type:Sequelize.ENUM(['accepted','declined','pending']),
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Transactions','status',{
      type:Sequelize.STRING,
    })
  }
};
