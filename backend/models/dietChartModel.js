const mongoose = require("mongoose")

const dietChatSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    meals: [{
        type: { type: String, required: true },
        items: [String],
        calories: Number,
        specialInstruction: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
)

const DietChart = mongoose.model("DietChart", dietChatSchema)

module.exports = DietChart;