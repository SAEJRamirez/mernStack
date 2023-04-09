const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]


            //Verify token
            const decoded = jwt.verify(token, "j3suisunl4m4f0rt")


            //Get user from token
            req.user = await User.findById(decoded.id).select('-password') //ID set in token in generateToken function
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Non authorisé')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Non authorisé, pas de token')
    }
})

module.exports = protect