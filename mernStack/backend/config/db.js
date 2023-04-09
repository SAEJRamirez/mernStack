const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://julien1234:julien1234@cluster-mern-app.rflgagu.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb