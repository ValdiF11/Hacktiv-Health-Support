'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DoctorPatients', 'DoctorsId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Doctors",
        key:"id"
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('DoctorPatients','DoctorsId');
  }
};
