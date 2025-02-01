const expressAsyncHandler = require("express-async-handler");

const createPantryTask = expressAsyncHandler(async (req, res) => { })
const getAllPantryTasks = expressAsyncHandler(async (req, res) => { })
const getPantryTaskByStaff = expressAsyncHandler(async (req, res) => { })
const updateTaskStatus = expressAsyncHandler(async (req, res) => { })
const deletePantryTask = expressAsyncHandler(async (req, res) => { })

module.exports = { createPantryTask, getAllPantryTasks, getPantryTaskByStaff, updateTaskStatus, deletePantryTask }