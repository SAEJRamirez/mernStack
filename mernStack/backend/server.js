const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db.js')
const port = process.env.PORT || 5000
const colors = require('colors')

connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})