const Canvas = require('canvas')
const {MessageAttachment} = require('discord.js')
const path = require('path')
const {getChannelId} = require('@commands/setup/setwelcome')

module.exports = client => {
    client.on('guildMemberAdd', member => {

    })
}

module.exports.config = {
    displayName: 'Welcome',

    dbName: 'WELCOME',

    loadDBFirst: true
}