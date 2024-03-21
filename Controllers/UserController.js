const bcrypt = require("bcryptjs");
const { User, Doctor, Patient } = require("../models");

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
      if (user.length > 0) {
        let isValidPassowed = bcrypt.compareSync(password, user.password);
        req.session.userId = user[0].dataValues.id;
        if (isValidPassowed) {
          if (user[0].dataValues.role === "doctor") {
            res.redirect("/doctors");
          } else {
            res.redirect("/patients");
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
      let { username, email, password } = req.body;
      let mailHost = email.split("@")[1];
      let role;
      if (mailHost == "kitasehat.com") {
        role = "doctor";
      } else {
        role = "patient";
      }
      let dataUser = await User.Create({ username, email, password, role });
      if (role === "doctor") {
        dataUser.save();
        let data = await User.findAll({ where: { username } });
        res.redirect(`/register/doctors/${data[0].dataValues.id}`);
      } else {
        dataUser.save();
        let data = await User.findAll({ where: { username } });
        res.redirect(`/register/users/${data[0].dataValues.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async registerDoctor(req, res) {
    try {
      const { error } = req.query;
      res.render("auth-pages/formDoctor");
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(req, res) {
    try {
      const { error } = req.query;
      res.render("auth-pages/formUser");
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegUser(req, res) {
    try {
      let { name, gender, birthdate, phoneNumber, address } = req.body;
      let { UsersId } = req.params;
      let dataDoctor = await Doctor.Create({ name, gender, birthdate, phoneNumber, address, UsersId });
      dataDoctor.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegDoctor(req, res) {
    try {
      let { name, specialization, phoneNumber, address } = req.body;
      let { UsersId } = req.params;
      let dataDoctor = await Doctor.Create({ name, specialization, phoneNumber, address, UsersId });
      dataDoctor.save();
      res.redirect("/");
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
