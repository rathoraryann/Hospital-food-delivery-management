const route = require("express").Router();
const { signup, login } = require("../controllers/userController")

route.post('/', signup)
route.post('/login', login)

module.exports = route;