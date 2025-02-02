const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const connDB = require('./connDB/connDB')
const { errorHandler, notFound } = require("./middlewares/errorMiddleware")
const userRoutes = require("./routes/userRoutes")
const patientRoutes = require("./routes/patientRoutes")
const dietChartRoutes = require("./routes/dietChartRoutes")
const pantryTaskRoutes = require("./routes/pantryTaskRoutes")
const deliveryRoutes = require("./routes/deliveryRoutes")

app.use(cors());
app.use(express.json())
dotenv.config();
connDB();

// ---------------------------------Routes------------------------------
app.use("/api/auth/user", userRoutes)
app.use("/api/patient", patientRoutes)
app.use("/api/diet", dietChartRoutes)
app.use("/api/pantry-task", pantryTaskRoutes)
app.use("/api/delivery", deliveryRoutes)



// ---------------------------------error handling middlewares------------------------------
app.use(errorHandler)
app.use(notFound)



app.get('/', (req, res) => {
    res.json("hello")
})

app.listen(process.env.PORT, (req, res) => {
    console.log("running")
})