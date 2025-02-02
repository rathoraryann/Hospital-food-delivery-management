const { createDelivery, getAllDeliveries, updateDeliveryStatus, deleteDelivery } = require("../controllers/deliveryController");
const authMiddleware = require("../middlewares/authMiddleware");
const routes = require("express").Router()


routes.get('/', authMiddleware, getAllDeliveries)
routes.post('/add', authMiddleware, createDelivery)
routes.put('/update/:id', authMiddleware, updateDeliveryStatus)
routes.delete('/delete/:id', authMiddleware, deleteDelivery)

module.exports = routes;