const mongoose = require('mongoose')

const ticketDataSchema = mongoose.Schema({
    GuildID: String,
    MessageID: String,
    TicketNumber: Number,
    whitelistedRole: String,
})

module.exports = mongoose.model('Ticket-Setup', ticketDataSchema)