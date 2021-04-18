const mongoose = require('mongoose')

const muteSchema = mongoose.Schema({
    userId: String,
    guildId: String,
    reason: String,
    staffId: String,
    staffTag: String,
    expires: Date,
    current: Boolean    
}, {
    timestamps: true
})

module.exports = mongoose.model('mutes', muteSchema)