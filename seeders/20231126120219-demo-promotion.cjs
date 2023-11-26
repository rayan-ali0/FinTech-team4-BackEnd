'use strict';
var faker = require(`@faker-js/faker`).faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const futureDate=new Date()
    futureDate.setDate(futureDate.getDate()+7)
    const promotions=Array.from({length:20}).map(()=>({
      UserId:faker.number.int({min:1,max:10}),
      description:faker.lorem.sentence(),
      percentage:faker.number.int({min:1,max:100}),
      code:faker.datatype.string({length:8,alphaNumeric:true}),
      expDate: futureDate,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Promotions',promotions,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Promotions', null, {});

  }
};
