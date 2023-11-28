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
    await queryInterface.changeColumn('Transactions','type',{
      type:Sequelize.ENUM(['accepted','declined','pending']),
    })
    await queryInterface.removeColumn('Transactions','Date')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Transactions','amountUSD',{
      type:Sequelize.DECIMAL,
    })
    await queryInterface.changeColumn('Transactions','amountUSDT',{
      type:Sequelize.DECIMAL,
    })
  
    await queryInterface.addColumn('Transactions','Date',{
      type:Sequelize.DataTypes.DATE
    })
  }
};
