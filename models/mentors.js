const mongoose = require('mongoose')


const mentorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avldays: {
        type: Number,
        required: true,
    },
    maxbooking: {
        type: Number,
        required: true,
    },
    skills: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
    },
    feeperday: {
        type: Number,
        required: true,
    },
    imageurl: {
        type: "array",

    },
    currentbookings: {
        type: "array"
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
    { timestamps: true },

)


const mentorModel = mongoose.model("mentors", mentorSchema)
module.exports = mentorModel