const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    text: {
        required: true,
        type: String

    },
    user:{
        required: false,
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
  
    
    
})

module.exports = mongoose.model('Comment', CommentSchema)