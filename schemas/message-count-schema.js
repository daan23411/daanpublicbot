const mongoose = require('mongoose')

const messageCountSchema = mongoose.Schema({
    // User id
    _id: {
        type: String,
        required: true
    },

    // how many messages they have sent
    messageCount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('message-counts', messageCountSchema)