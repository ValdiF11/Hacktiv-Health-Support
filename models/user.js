"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Patient, {
        foreignKey: "UsersId",
      });
      User.hasOne(models.Doctor, {
        foreignKey: "UsersId",
      });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "username not-empty",
          },
          notNull: {
            msg: "username not-null",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: "email not-empty",
          },
          notNull: {
            msg: "email not-null",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "password not-empty",
          },
          notNull: {
            msg: "password not-null",
          },
          isPassword(value) {
            if (value.length <= 8) {
              throw new Error("Password length must be at least 8 charackter");
            }
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, option) {
          var salt = bcrypt.genSaltSync(8);
          var hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
    }
  );
  return User;
};
