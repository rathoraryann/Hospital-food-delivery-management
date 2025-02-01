const authMiddleware = require("../middlewares/authMiddleware")
const { addPatient, deletePatient, getPatientById, getAllPatients, updatePatient } = require("../controllers/patientController");
const route = require("express").Router();

route.get('/', authMiddleware, getAllPatients)
route.get('/:id', authMiddleware, getPatientById)
route.post('/add', authMiddleware, addPatient)
route.delete('/delete/:id', authMiddleware, deletePatient)
route.put('/update/:id', authMiddleware, updatePatient)

module.exports = route;