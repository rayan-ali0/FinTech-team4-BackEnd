'use strict';
// var faker=require('@faker-js/faker').faker;
// import faker from 'faker'
var faker = require(`@faker-js/faker`).faker;
// const path = require('path');
// const faker = require(path.resolve('node_modules/faker'));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users=Array.from({length:10}).map(()=>({
      name:faker.person.fullName(),
      username :faker.internet.userName(),
      email:faker.internet.email(),
      password:faker.internet.password(),
      role:faker.helpers.arrayElement(['admin','user','merchant']),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Users',users,{})
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
