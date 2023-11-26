'use strict';
var faker = require(`@faker-js/faker`).faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const wallets=Array.from({length:10}).map(()=>({
      UserId:faker.number.int({min:1,max:10}),
      usdBalance:faker.finance.amount(100,1000,2),
      usdtBalance:faker.finance.amount(50,700,2),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Wallets',wallets,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wallets', null, {});

  }
};
