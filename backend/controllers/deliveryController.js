const expressAsyncHandler = require("express-async-handler");

const createDelivery = expressAsyncHandler(async (req, res) => { })
const getAllDeliveries = expressAsyncHandler(async (req, res) => { })
const getAllDeliveriesByPerson = expressAsyncHandler(async (req, res) => { })
const updateDeliveryStatus = expressAsyncHandler(async (req, res) => { })
const deleteDelivery = expressAsyncHandler(async (req, res) => { })

module.exports = { createDelivery, getAllDeliveries, getAllDeliveriesByPerson, updateDeliveryStatus, deleteDelivery }