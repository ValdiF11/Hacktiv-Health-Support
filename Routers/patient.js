const express = require("express");
const bcrypt = require("bcryptjs");
const patientController = require("../Controllers/PatientController");
const patient = express.Router();

patient.get("/", patientController.showMedical);

patient.get("/appointment", patientController.showAppointment);

patient.post("/appointment", patientController.postAppointment);

patient.get("/showHealth", patientController.showHealth);

patient.get("/deleteHealth", patientController.deleteHealth);

patient.get("/addHealth", patientController.addhealthParameter);

patient.post("/addHealth", patientController.postHelath);

module.exports = patient;
