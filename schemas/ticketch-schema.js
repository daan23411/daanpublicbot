const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const ticketSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('Ticket-channels', ticketSchema)