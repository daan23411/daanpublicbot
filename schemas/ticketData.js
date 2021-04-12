const mongoose = require('mongoose')

const TicketDataSchema = mongoose.Schema({
    MessageID: String,
    GuildID: String,
    TicketNumber: Number,
    WhitelistedRole: String
})

module.exports = mongoose.model('Ticket-Setup', TicketDataSchema)