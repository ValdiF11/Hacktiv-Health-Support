const express = require("express");
const bcrypt = require("bcryptjs");
const UsersController = require("../Controllers/UserController");
const Controller = require("../Controllers/controller");
const router = express.Router();

router.get("/", Controller.showHome);
// get username register
router.get("/register", UsersController.registerFrom);
// post username register
router.post("/register", UsersController.postRegister);
// get patient register
router.get("/register/users/:UsersId", UsersController.registerUser);
// post patient register
router.post("/register/users/:UsersId", UsersController.postRegUser);
// get doctor register
router.get("/register/doctors/:UsersId", UsersController.registerDoctor);
// post doctor register
router.post("/register/doctors/:UsersId", UsersController.postRegDoctor);
// menuju login Form
router.get("/login", UsersController.loginForm);
// setelah login
router.post("/login", UsersController.postLogin);
// logout
router.get("/logout", UsersController.logout);

router.use(function (req, res, next) {
  if (!req.session.userId) {
    const error = "please login first";
    res.redirect(`/login/error=${error}`);
  } else {
    next();
  }
});

// router.use("/doctors", require("./doctor"));
// router.use("/patients", require("./patient"));

// router.get("/tabel", patientController.showPatient);

module.exports = router;
