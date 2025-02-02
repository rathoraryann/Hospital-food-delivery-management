const mongoose = require("mongoose")

const DeliverySchema = mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    dietChart: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
    deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: "pending", required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Delivery", DeliverySchema)