const express = require("express");
const bcrypt = require("bcryptjs");
const patientController = require("../Controllers/PatientController");
const patient = express.Router();

patient.get("/:PatientId", patientController.showMedical);

patient.get("/:PatientId/appointment", patientController.showAppointment);

patient.post("/:PatientId/appointment", patientController.postAppointment);

patient.get("/:PatientId/showHealth", patientController.showHealth);

patient.get("/:PatientId/addHealth/", patientController.addhealthParameter);

patient.post("/:PatientId/addHealth/", patientController.postHelath);

patient.get("/:PatientId/deleteHealth/:HealthId", patientController.deleteHealth);

module.exports = patient;
