'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Wallets','usdBalance',{
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    })
    await queryInterface.changeColumn('Wallets','usdtBalance',{
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
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
