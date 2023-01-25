const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: String,
        required: [true, 'id must be provided']
    },
    text: {
        type: String,
        required: [true, 'text must be provided']
    }
})

module.exports = mongoose.model('goal', goalSchema)