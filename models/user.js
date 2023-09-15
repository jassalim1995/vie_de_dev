const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        required: false,
        type: String

    },
    last_name: {
        required: false,
        type: String

    },
    birth_date : {
        required: false,
        type: Date

    },
    email: {
        required: false,
        type: String,

    },
    role:{
        required: false,
        type: String

    },
    password:{
        required: true,
        type: String

    },
    creation_date:{
        type: Date
    }
   
    
})

module.exports = mongoose.model('User', UserSchema)