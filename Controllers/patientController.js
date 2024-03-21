const { Doctor, Patient, DoctorPatient, HealthParameter } = require("../models");

class patientController {
    static async showAppointment(req, res) {
        try {
            const doctors = await Doctor.findAll();
            res.render('showformappointment', { doctors: doctors });
        } catch (error) {
            res.send(error);
        }
    }
    static async showMedical(req, res) {
        try {
            const patientId = req.params.patientId;
            const patients = await Patient.findAll({
                where: {
                    id:patientId
                },
                include: [{
                    model: DoctorPatient,
                    include: [{
                        model: Doctor,
                        attributes: ['name']
                    }]
                }]
            });
            res.render('showTableMedical', { patients: patients });
        } catch (error) {
            res.send(error);
        }
    }
    static async showHealth(req, res) {
        try {
            let data = HealthParameter.findAll();
            res.render('showTableHealth', { data });
        } catch (error) {
            res.send(error);
        }
    }
    static async deleteHealth(req, res) {
        try {
            const { PatientsId, HealthId } = req.params;
            await HealthParameter.destroy({
                where: {
                    id: HealthId
                }
            });
            res.redirect(`showTableHealth/${PatientsId}`);
        } catch (error) {
            
        }
    }
}

module.exports = patientController;