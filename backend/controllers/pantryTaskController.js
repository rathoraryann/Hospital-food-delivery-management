const expressAsyncHandler = require("express-async-handler");
const { verifyAuthentication } = require("../config/config");
const PantryTask = require("../models/pantryTaskModel");

const createPantryTask = expressAsyncHandler(async (req, res) => {
    if (!verifyAuthentication(req.user)) return;
    const { taskName, dietChart, assignedTo } = req.body;
    if (!taskName || !dietChart || !assignedTo) return;
    try {
        const pantryTask = await PantryTask.create({ taskName, dietChart, assignedTo })
        res.status(200).json({ pantryTask })
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const getAllPantryTasks = expressAsyncHandler(async (req, res) => {
    const pantryTasks = await PantryTask.find({})
    if (pantryTasks) return res.status(200).json(pantryTasks)
    return res.status(400).json({ message: "failed! something wrong" })
})
// const getPantryTaskByStaff = expressAsyncHandler(async (req, res) => {
//     const id = req.body;
//     if (!id) return;
//     const pantryTask = await PantryTask.findById(id)
//     if (!pantryTask) return res.status(400).json({ message: "pantry task not found" })
//     if (pantryTask) res.status(200).json(pantryTask)
//     res.status(400).json(400).json({ message: "failed! something wrong" })
// })
const updateTaskStatus = expressAsyncHandler(async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    if (!id || !status) return;
    const updatedPantryTask = await PantryTask.findByIdAndUpdate(id, { $set: { status: status } })
    if (updatedPantryTask) {
        res.status(200).json({ message: "status updated" })
    } else {
        res.status(400).json({ message: "failed! something wrong" })
    }
})
const deletePantryTask = expressAsyncHandler(async (req, res) => {
    if (!verifyAuthentication(req.user)) return;
    const id = req.params.id;
    if (!id) return;
    try {
        await PantryTask.findByIdAndDelete(id)
        res.status(200).json({ message: "Pantry task deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})

module.exports = { createPantryTask, getAllPantryTasks, updateTaskStatus, deletePantryTask }