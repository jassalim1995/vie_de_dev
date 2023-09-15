const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    titre: {
        required: true,
        type: String

    },
    text: {
        required: true,
        type: String

    },
    likes :{
        type: Number

    },

    timestamp:{
        type: Number, 
        default: Date.now()
        
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',

    }],
    publisher:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',

      },
    image :{
        type: String,
        default: null
        
    }   
    
})

module.exports = mongoose.model('Post', PostSchema)