//code to get all bookings present in db to show on the admin screen

const bookingModel = require("../models/bookings")

const getallbooking = async (req, res) => {
    try {
        const book = await bookingModel.find()
        // console.log(process.env.key)
        res.send(book)

    } catch (err) {
        return res.send(err)
    }
}

module.exports = { getallbooking }