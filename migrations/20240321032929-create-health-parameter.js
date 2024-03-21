'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthParameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkedDate: {
        type: Sequelize.DATE
      },
      checkedResult: {
        type: Sequelize.STRING
      },
      mark: {
        type: Sequelize.STRING
      },
      Fee: {
        type: Sequelize.INTEGER
      },
      PatientsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Patients",
          key:"id",
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
    await queryInterface.dropTable('HealthParameters');
  }
};