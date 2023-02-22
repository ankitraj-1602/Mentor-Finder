//code for db connection

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (err) {
        console.log("while connection something error")
    }
}

module.exports = connectDb