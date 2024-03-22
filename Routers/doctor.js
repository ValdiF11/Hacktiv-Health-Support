const express = require("express");
const bcrypt = require("bcryptjs");
const UsersController = require("../Controllers/UserController");
const Controller = require("../Controllers/controller");
const DoctorsController = require("../Controllers/DoctorController");
const doctor = express.Router();

// show table appointment
doctor.get("/:DoctorId", DoctorsController.showTable);

// edit status

doctor.get("/:DoctorId/status", DoctorsController.editStatus);

// add note

doctor.get("/:DoctorId/addNote", DoctorsController.addNotePost);

module.exports = doctor;
