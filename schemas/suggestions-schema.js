const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const suggestionsSchema = mongoose.Schema({
   _id: reqString,
   channelId: reqString
})

module.exports = mongoose.model('suggestion-channels', suggestionsSchema)