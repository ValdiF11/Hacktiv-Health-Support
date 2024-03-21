'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/doctors.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert('Doctors', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {
      truncate: true,
      restartIdentity: true,
      cascade:true,
   });
  }
};
