const { Doctor, Patient, DoctorPatient, HealthParameter } = require("../models");

class patientController {
  static async showAppointment(req, res) {
    try {
      const doctors = await Doctor.findAll();
      res.render("showformappointment", { doctors: doctors });
    } catch (error) {
      res.send(error);
    }
  }
  static async postAppointment(req, res) {
    try {
      const { appointmentDate, DoctorsId, note } = req.body;
      await DoctorPatient.create({
        appointmentDate: appointmentDate,
        DoctorsId: DoctorsId,
        status: false,
        note: note,
        fee: 50000,
      });
      res.redirect("/showFormAppointment");
    } catch (error) {
      res.send(error);
    }
  }
  static async showMedical(req, res) {
    try {
      const patientId = req.params.patientId;
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
        where: {
          id: patientId,
        },
      });
      res.render("showTableMedical", { patients: patients });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async showHealth(req, res) {
    try {
      let data = HealthParameter.findAll();
      res.render("showTableHealth", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async addhealthParameter(req, res) {
    try {
      res.render("showAddHealth");
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
      const { PatientsId } = req.params;
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
      res.redirect(`patients/${PatientsId}/showHealth`);
      r;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = patientController;
