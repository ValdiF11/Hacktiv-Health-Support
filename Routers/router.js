const express = require("express");
const UsersController = require("../Controllers/UserController");
const router = express.Router();

router.get("/", Controller.home);
// get username register
router.get("/register", UsersController.registerFrom);
// post username register
router.post("/register", UsersController.registerFrom);
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
router.get("/login", UsersController.postLogin);
// logout
router.get("/logout", UsersController.logout);

router.use((req, res, next) => {
  if (!req.session.userId) {
    const error = "please login first";
    res.redirect(`/login/error=${error}`);
  } else {
    next();
  }
});

router.use("/doctors", require("./doctor"));
router.use("/patients", require("./patient"));

module.exports = router;
