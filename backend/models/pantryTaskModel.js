const mongoose = require("mongoose")

const PantryTaskSchema = mongoose.Schema({
    taskName: { type: String, required: true },
    dietChart: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: pending }
}, {
    timestamps: true
})

module.exports = mongoose.model("PantryTask", PantryTaskSchema)