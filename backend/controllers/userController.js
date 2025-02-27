const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const { generateHashedPassword, generateToken, matchPassword } = require("../config/config")

const signup = asyncHandler(async (req, res) => {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) return;
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(300).json({ message: "user exists" })
        return;
    }
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "failed something wrong" })
        return;
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return;
    const user = await User.findOne({ email })
    if (user && (await matchPassword(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message: "invalid credentials"
        })
    }
})

module.exports = { signup, login }