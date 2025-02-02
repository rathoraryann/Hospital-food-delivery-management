const { createPantryTask, deletePantryTask, getAllPantryTasks, updateTaskStatus } = require("../controllers/pantryTaskController")
const authMiddleware = require("../middlewares/authMiddleware")
const routes = require("express").Router()

routes.get("/", authMiddleware, getAllPantryTasks)
routes.post("/add", authMiddleware, createPantryTask)
routes.put("/update/:id", authMiddleware, updateTaskStatus)
routes.delete("/delete/:id", authMiddleware, deletePantryTask)

module.exports = routes