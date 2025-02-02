const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const userModel = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" })
}
const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const matchPassword = async (enteredPassword, userPassword) => {
    return bcrypt.compare(enteredPassword, userPassword)
}

const verifyAuthentication = (user) => {
    if (user.role != "manager") return false;
    return true;

}

const verifyPantryUser = (user) => {
    if (user.role != "pantry") return false;
    return true
}

const verifyDeliveryUser = (user) => {
    if (user.role != "delivery") return false
    return true
}

module.exports = { generateHashedPassword, generateToken, matchPassword, verifyAuthentication, verifyPantryUser, verifyDeliveryUser }