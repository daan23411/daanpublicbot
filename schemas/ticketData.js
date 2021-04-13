const mongoose = require('mongoose')

const ticketDataSchema = mongoose.Schema({
    GuildID: String,
    TicketNumber: Number,
})

module.exports = mongoose.model('Ticket-Setup', ticketDataSchema)