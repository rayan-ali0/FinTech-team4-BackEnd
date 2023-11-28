'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.changeColumn('Users','pic',{
    type:Sequelize.STRING,
    defaultValue:'images/default.jpg'
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users','pic',{
      type:Sequelize.STRING,
      defaultValue:''
    })
  }
};
