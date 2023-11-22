'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'promotionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Promotions",
        key: `promotionId`
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Transactions','promotionId')
  }
};
