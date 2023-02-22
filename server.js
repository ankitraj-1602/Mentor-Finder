const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const AdminRoutes=require('./routes/AdminRoutes')
const connectDb = require('./configue/connectDb')
const userRoutes = require('./routes/userRoutes')
const mentorRoute = require("./routes/mentorRoutes")
const bookingRoutes = require('./routes/bookingRoutes')

dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/mentors", mentorRoute)
app.use('/api/admin',AdminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/booking', bookingRoutes)

connectDb()


PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`${PORT} this is running port`)
})