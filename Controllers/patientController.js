const { Doctor, Patient, DoctorPatient, HealthParameter } = require("../models");

class patientController {
  static async showAppointment(req, res) {
    try {
      let { PatientId } = req.params;
      let doctors = await Doctor.findAll();
      res.render("showformappointment", { doctors, PatientId });
    } catch (error) {
      res.send(error);
    }
  }
  static async postAppointment(req, res) {
    try {
      let { PatientId } = req.params;
      const { appointmentDate, DoctorsId } = req.body;
      let data = await DoctorPatient.create({
        PatientsId: PatientId,
        appointmentDate: appointmentDate,
        DoctorsId: DoctorsId,
        status: false,
        Note: "",
        Fee: 50000,
      });
      console.log(data);
      data.save();
      res.redirect(`/patients/${PatientId}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
  static async showMedical(req, res) {
    try {
      let { PatientId } = req.params;
      const patients = await Patient.findAll({
        include: [
          {
            model: DoctorPatient,
            include: [
              {
                model: Doctor,
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      console.log(patients);
      res.render("showTableMedical", { patients, PatientId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async showHealth(req, res) {
    try {
      let { PatientId } = req.params;
      let data = await HealthParameter.findAll({
        where: { PatienstId: PatientId },
      });
      console.log(data);
      res.render("showTableHealth", { data, PatientId });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
  static async addhealthParameter(req, res) {
    try {
      const { PatientId } = req.params;
      res.render("showAddHealt", { PatientId });
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteHealth(req, res) {
    try {
      const { PatientsId, HealthId } = req.params;
      await HealthParameter.destroy({
        where: {
          id: HealthId,
        },
      });
      res.redirect(`patients/${PatientsId}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async postHelath(req, res) {
    try {
      const { PatientId } = req.params;
      let input = req.body;
      let markResult;
      if (+input.checkedResult > 120) {
        markResult = "high blood pressure";
      } else if (+input.checkedResult > 80) {
        markResult = "normal blood pressure";
      } else {
        markResult = "low blood pressure";
      }
      let data = HealthParameter.create({
        checkedDate: input.checkedDate,
        checkedResult: input.checkedResult,
        mark: markResult,
        fee: 25000,
      });
      data.save();
      res.redirect(`patients/${PatientId}/showHealth`);
      r;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = patientController;
