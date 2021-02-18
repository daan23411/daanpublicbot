const config = require('./config.json')

module.exports = client => {
    const channelIds = [
       // '805216410703364107', // polls
    ]

    const addReactions = message => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750)
    }

    client.on('message', async (message) => {
        if(channelIds.includes(message.channel.id)) {
            addReactions(message)
        } else if (message.content.toLowerCase() === `${config.prefix}poll`) {
            await message.delete()

            const fetched = await message.channel.messages.fetch({ limit: 1 })
            if (fetched && fetched.first()) {
                addReactions(fetched.first())
            }
        }
    })
}