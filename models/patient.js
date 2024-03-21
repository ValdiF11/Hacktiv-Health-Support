'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.HealtParameter, {
        foreignKey: 'PatientsId'
      });
      Patient.belongsToMany(models.Doctor, {
        through: models.DoctorPatient,
        foreignKey: 'PatientsId'
      });
    }
  }
  Patient.init({
    name: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:'name not-empty'
        },
        notNull: {
          msg:'name not-null'
        }
      }
    },
    gender: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:'gender not-empty'
        },
        notNull: {
          msg:'gender not-null'
        }
      }
    },
    birthdate: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'birthdate not-empty'
        },
        notNull: {
          msg: 'birthdate not-null'
        }
      },
    },
    address: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:'address not-empty'
        },
        notNull: {
          msg:'address not-null'
        }
      },
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'phoneNumber not-empty'
        },
        notNull: {
          msg: 'phoneNumber not-null'
        }
      },
    },
    UsersId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
    },
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};