const { Doctor, Patient, DoctorPatient, HealthParameter } = require("../models");

class DoctorController {
  static async showTable(req, res) {
    try {
      let data = await Doctor.findAll();
      res.render("showTableDoctor", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async editStatus(req, res) {
    try {
      const { id } = req.params;
      await DoctorPatient.update(
        {
          status: true,
        },
        {
          where: { id: id },
        }
      );
      res.redirect("showTableDoctor?statusChanged=true");
    } catch (error) {
      res.send(error);
    }
  }
  static async addNote(req, res) {
    try {
      res.render("showAddNote");
    } catch (error) {
      res.send(error);
    }
  }
  static async addNotePost(req, res) {
    try {
      const { id } = req.params;
      const { note } = req.body;

      const updatedDoctorPatient = await DoctorPatient.update({ note: note }, { where: { id: id } });

      res.redirect("/showFormAppointment", { updatedDoctorPatient });
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = DoctorController;
