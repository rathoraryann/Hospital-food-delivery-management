const routes = require("express").Router();
const { createDietChart, getDietChartByPatient, updateDietChart, deleteDietChart } = require("../controllers/dietChartController");
const authMiddleware = require("../middlewares/authMiddleware");

routes.get("/:id", authMiddleware, getDietChartByPatient)
routes.post("/add", authMiddleware, createDietChart)
routes.put("/update/:id", authMiddleware, updateDietChart)
routes.delete("/delete/:id", authMiddleware, deleteDietChart)

module.exports = routes