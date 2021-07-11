const messageSchema = require('@schemas/message')

const cache = {}

module.exports = async (client) => {
    client.on('messageReactionAdd', (reaction, user) => {

    })
    client.on('messageReactionRemove', (reaction, user) => {

    })

    const results = await messageSchema.find()

    for (const result of results) {
        const { guildId, channelId, messageId, roles} = result

        const guild = await client.guilds.cache.get(guildId)

        if(!guild) {
            await messageSchema.deleteOne({ guildId })
            return
        }

        const channel = await guild.channels.cache.get(channelId)

        if(!channel) {
            return await messageSchema.deleteOne({ channelId })
        }

        try {
            const cacheMessage = true
            const skipMessage = true
            const fetchedMessage = await channel.messages.fetch(messageId, cacheMessage, skipMessage)

            if(fetchedMessage) {
                // TODO: Update the Cache
            }
        } catch (e) {
            return await messageSchema.deleteOne({ messageId })
        }
    }
}

module.exports.config = {
    displayName: 'Reaction Roles',
    dbName: 'reaction-roles',
    loadDBFirst: true
}