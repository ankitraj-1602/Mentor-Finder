//code for db connection

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.Murl)
        
        console.log(process.env.STRIPE_SECRET_KEY)
    } catch (err) {
        console.log("while connection something error")
    }
}

module.exports = connectDb