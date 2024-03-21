const express = require('express')
const router = express.Router();
const patientController = require("../Controllers/patientController");


router.get("/tabel", patientController.showPatient);

module.exports= router