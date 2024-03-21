const express = require("express");
const bcrypt = require("bcryptjs");
const UsersController = require("../Controllers/UserController");
const Controller = require("../Controllers/controller");
const DoctorsController = require("../Controllers/DoctorController");
const doctor = express.Router();

// show table appointment
doctor.get("/", DoctorsController.showTable);

// edit status

doctor.get("/status", DoctorsController.showStatus);

// add note

doctor.get("/addNote", DoctorsController.showStatus);

module.exports = doctor;
