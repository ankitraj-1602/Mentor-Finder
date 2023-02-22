const mongoose = require("mongoose");


const bookingSchema = mongoose.Schema({
    mentor: { type: String, required: true },
    mentorid: { type: String, required: true },
    userid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true, default: 'booked' },
    pintentid: { type: String, required: true },
    mengmail: { type: String, required: true },
    usergmail: { type: String, required: true },
    tokenid: { type: Number, required: true }
}, {
    timestamps: true,
})


const bookingModel = mongoose.model('bookings', bookingSchema)
module.exports = bookingModel