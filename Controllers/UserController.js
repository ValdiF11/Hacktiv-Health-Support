const bcrypt = require("bcryptjs");
const { User, Doctor, Patient } = require("../models");
const nodemailer = require("nodemailer");

class UsersController {
  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("auth-pages/login", { error });
    } catch (error) {
      console.log(error);
    }
  }
  static async postLogin(req, res) {
    try {
      const { username, password } = req.body;
      let user = await User.findAll({ where: { username } });
      let id = user[0].id;
      console.log(id);
      if (user) {
        let isValidPassowed = bcrypt.compareSync(password, user[0].password);
        console.log(isValidPassowed);
        req.session.userId = id;
        if (isValidPassowed) {
          if (user[0].role === "doctor") {
            res.redirect(`/doctors/${id}`);
          } else {
            res.redirect(`/patients/${id}`);
          }
        } else {
          throw new Error("invalid username/password");
        }
      } else {
        throw new Error("invalid username/password");
      }
    } catch (error) {
      res.redirect(`/login?error=${error.message}`);
    }
  }

  static async registerFrom(req, res) {
    try {
      res.render("auth-pages/formUser");
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegister(req, res) {
    try {
      let input = req.body;
      console.log(req.body);
      let dataUser = await User.create({
        username: input.username,
        email: input.email,
        password: input.password,
        role: input.role,
      });
      dataUser.save();
      let data = await User.findAll({ where: { username: input.username } });
      if (input.role == "doctor") {
        res.redirect(`/register/doctors/${data[0].id}`);
      } else {
        res.redirect(`/register/users/${data[0].id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async registerDoctor(req, res) {
    try {
      const { error } = req.query;
      let { UsersId } = req.params;
      res.render("auth-pages/formDoctor", { UsersId });
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(req, res) {
    try {
      const { error } = req.query;
      let { UsersId } = req.params;
      res.render("auth-pages/formPatient", { UsersId });
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegUser(req, res) {
    try {
      let input = req.body;
      console.log(input);
      let { UsersId } = req.params;
      let dataPatients = await Patient.create({
        name: input.name,
        gender: input.gender,
        birthdate: input.birthdate,
        phoneNumber: input.phoneNumber,
        address: input.address,
        UsersId: UsersId,
      });
      dataPatients.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegDoctor(req, res) {
    try {
      let { name, specialization, phoneNumber, address } = req.body;
      let { UsersId } = req.params;
      let dataDoctor = await Doctor.create({ name, specialization, phoneNumber, address, UsersId });
      dataDoctor.save();
      console.log("Message sent: %s", info.messageId);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
}

module.exports = UsersController;
