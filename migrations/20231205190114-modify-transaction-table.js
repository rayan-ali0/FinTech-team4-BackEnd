'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Transactions','amountUSD',{
      type:Sequelize.DECIMAL(10,2),
    })
    await queryInterface.changeColumn('Transactions','amountUSDT',{
      type:Sequelize.DECIMAL(10,2),
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
