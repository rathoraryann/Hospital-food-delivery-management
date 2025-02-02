const expressAsyncHandler = require("express-async-handler");
const { verifyPantryUser, verifyDeliveryUser } = require("../config/config");
const Delivery = require("../models/deliveryModel");

const createDelivery = expressAsyncHandler(async (req, res) => {
    if (!verifyPantryUser(req.user)) return;
    const { patient, dietChart, deliveryPerson, status } = req.body;
    try {
        const delivery = await Delivery.create({ patient, dietChart, deliveryPerson, status })
        res.status(200).json(delivery)
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})

const getAllDeliveries = expressAsyncHandler(async (req, res) => {
    try {
        const deliveries = await Delivery.find()
        res.status(200).json(deliveries)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "failed! something wrong" })
    }
})

// const getAllDeliveriesByPerson = expressAsyncHandler(async (req, res) => { })

const updateDeliveryStatus = expressAsyncHandler(async (req, res) => {
    if (!verifyDeliveryUser(req.user)) return;
    const { status } = req.body;
    const id = req.params.id;
    try {
        const delivery = await Delivery.findByIdAndUpdate(id, { $set: { status: status } }, { new: true })
        res.status(200).json(delivery)
    } catch (error) {
        res.status(200).json({ message: "failed! something wrong" })
    }
})

const deleteDelivery = expressAsyncHandler(async (req, res) => {
    if (!verifyPantryUser(req.user)) return;
    const id = req.params.id;
    try {
        await Delivery.findByIdAndDelete(id)
        res.status(200).json({ message: "Delivery deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "failed! something wrong" })
    }
})

module.exports = { createDelivery, getAllDeliveries, updateDeliveryStatus, deleteDelivery }