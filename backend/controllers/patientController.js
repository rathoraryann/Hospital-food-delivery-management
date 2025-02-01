const expressAsyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel")
const DietChart = require("../models/dietChartModel");
const { verifyAuthentication } = require("../config/config");

const addPatient = expressAsyncHandler(async (req, res) => {
    const { name, age, gender, roomNo, bedNo, floorNo, diseases, allergies, addmissionDate, dietChart, assignedDelivery } = req.body;
    verifyAuthentication(req.user)
    if (!name || !age || !gender || !roomNo || !bedNo || !floorNo || !diseases || !allergies) {
        res.status(400).json({ msg: "fill all the fields" })
        return;
    }
    if (await Patient.findOne({ bedNo })) {
        res.status(400).json({ msg: "there is patient on the bed" })
        return;
    }
    const patient = await Patient.create({
        name,
        age,
        gender,
        roomNo,
        floorNo,
        bedNo,
        diseases: JSON.parse(diseases),
        allergies: JSON.parse(allergies),
        addmissionDate: new Date(addmissionDate),
        dietChart,
        assignedDelivery
    })
    if (patient) {
        res.status(200).json({
            id: patient._id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            roomNo: patient.roomNo,
            bedNo: patient.bedNo,
            floorNo: patient.floorNo,
            allergies: patient.allergies,
            diseases: patient.diseases,
            addmissionDate: patient.addmissionDate,
            dietChart: patient.dietChart,
            assignedDelivery: patient.assignedDelivery,
        })
    } else {
        res.status(400).json({ msg: "failed something wrong" });
        return;
    }
})
const getAllPatients = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    try {
        const patients = await Patient.find({})
        res.status(200).json(patients)
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const getPatientById = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const patient = await Patient.findById(req.params.id)
    if (!patient) {
        return res.status(400).json({ message: "Patient not found" })
    }
    res.status(200).json(patient)
})
const updatePatient = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const patient = await Patient.findById(req.params.id)
    if (!patient) {
        return res.status(400).json({ message: "Patient not found" })
    }
    const patientOnBed = await Patient.findOne({ bedNo: req.body.bedNo })
    if (patientOnBed) {
        return res.status(400).json(`{ message: There is a patient on the bed no ${req.body.bedNo}}`)
    }
    try {
        const { roomNo, bedNo, floorNo } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
            roomNo, bedNo, floorNo
        }, { new: true })
        res.status(200).json(updatedPatient)
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const deletePatient = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        return res.status(400).json({ message: "Patient not found" });
    }
    try {
        await DietChart.deleteMany({ patient: req.params.id });

        await Patient.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Patient and associated diet charts deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = { addPatient, getAllPatients, getPatientById, updatePatient, deletePatient }