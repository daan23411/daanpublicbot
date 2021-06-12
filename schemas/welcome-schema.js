const mongoose = require('mongoose')

const welcomeSchema = new mongoose.Schema({
    _id: String,
    channelId: String
})

module.exports = mongoose.model('Welcome Schema', welcomeSchema)