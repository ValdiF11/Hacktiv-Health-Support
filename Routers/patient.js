const express = require("express");
const bcrypt = require("bcryptjs");
const patientController = require("../Controllers/PatientController");
const patient = express.Router();

doctor.get("/", patientController.showMedical);

doctor.get("/appointment", patientController.showAppointment);

doctor.post("/appointment", patientController.postAppointment);

doctor.get("/showHealth", patientController.showHealth);

doctor.get("/deleteHealth", patientController.deleteHealth);

doctor.get("/addHealth", patientController.addHealth);

doctor.post("/addHealth", patientController.postHelath);
