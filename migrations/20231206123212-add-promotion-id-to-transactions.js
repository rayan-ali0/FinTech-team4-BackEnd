'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.addColumn('Transactions','PromotionId',{
  type:Sequelize.INTEGER,
  onDelete:"CASCADE",
  references:{
    model:"Promotions",
    key:"id",
    as:"PromotionId"
  }
})

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transactions', 'PromotionId');

  }
};
