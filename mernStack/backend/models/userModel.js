const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Merci d\'ajouter un nom']
    },
    email: {
        type: String,
        required: [true, 'Merci d\'ajouter un email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Merci d\'ajouter un mot de passe']
    },
    image: {
        type: String
    }
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)