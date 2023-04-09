const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, image } = req.body


    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Merci de remplir tous les champs')
    }

    //Check if user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('l\'utilisateur existe déjà')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image : image
    })

    //Check for user created
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('Données invalides')
    }

})



//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    //Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken (user._id)
        })
    } else {
        res.status(400)
        throw new Error('Données invalides')
    }
})



//@desc     Get a user
//@route    GET /api/users/me
//@access   Public
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email, image} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
        image
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, "j3suisunl4m4f0rt", {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
