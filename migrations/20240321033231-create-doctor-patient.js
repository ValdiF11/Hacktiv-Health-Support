'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DoctorPatients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appointmentDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Note: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Fee: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PatientsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Patients",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DoctorPatients');
  }
};