const expressAsyncHandler = require("express-async-handler");
const DietChart = require("../models/dietChartModel");
const { verifyAuthentication } = require("../config/config");
const Patient = require("../models/patientModel");

const createDietChart = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    var { patient, meals } = req.body;
    if (!patient || !meals) {
        return res.status(400).json({ message: "fill the required fields" })
    }
    try {
        meals = typeof req.body.meals === "string" ? JSON.parse(req.body.meals) : req.body.meals;
        const createdDietChart = await DietChart.create({
            patient,
            meals,
            createdBy: req.user._id
        })
        await Patient.findByIdAndUpdate(patient, { $set: { dietChart: createdDietChart._id } })
        res.status(200).json(createdDietChart)
    } catch (error) {
        console.log("error", error)
        console.log("message", error.message)
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const getDietChartByPatient = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const id = req.params.id;
    if (!id) return;
    const patient = await Patient.findById(id);
    if (!patient) return;
    try {
        const dietChart = await DietChart.find({ patient: id })
        if (!dietChart) return res.status(200).json({ message: "there is not a diet chart defined for this user" })
        res.status(200).json(dietChart)
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const updateDietChart = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const id = req.params.id;
    if (!id) return;
    const { patient, meals } = req.body;
    try {
        await DietChart.findByIdAndUpdate(id, { patient, meals }, { new: true })
        res.status(200).json({ message: "updated successfully" })
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const deleteDietChart = expressAsyncHandler(async (req, res) => {
    verifyAuthentication(req.user)
    const id = req.params.id
    if (!id) return;
    const dietChart = await DietChart.findById(id)
    if (!dietChart) return res.status(400).json({ message: "diet not found" })
    try {
        await Patient.findOneAndUpdate({ _id: dietChart.patient }, { $pull: { dietChart: id } })
        await DietChart.findByIdAndDelete(id)
        res.status(200).json({ message: "Diet chart deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})

module.exports = { createDietChart, getDietChartByPatient, updateDietChart, deleteDietChart }