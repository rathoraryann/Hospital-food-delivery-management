const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch (error) {
            res.status(400)
            return;
        }
    }
    if (!token) {
        res.status(400);
        return;
    }
})

module.exports = authMiddleware;