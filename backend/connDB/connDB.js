const mongoose = require('mongoose')


const connDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        return error.message;
    }
}

module.exports = connDB;