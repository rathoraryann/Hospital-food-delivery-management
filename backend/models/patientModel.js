const mongoose = require("mongoose")

const patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    roomNo: { type: String, required: true },
    bedNo: { type: String, required: true },
    floorNo: { type: String, required: true },
    diseases: [{ type: String, required: true }],
    allergies: [{ type: String, required: true }],
    addmissionDate: { type: Date, default: Date.now },
    dietChart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DietChart"
    },
    assignedDelivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery"
    },
})

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient;