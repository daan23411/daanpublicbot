const suggestionSchema = require('@schemas/suggestions-schema')
const { fetchSuggestionChannels } = require('@features/suggestions')

module.exports = {
    name: 'setsuggestions',
    category: 'Setup',
    description: 'Setup the Suggestions channel.',
    userPermissions: ['ADMINISTRATOR'],
    async callback({message, args}) {
        const channel = message.mentions.channels.first() || message.channel

        const { guild: { id: guildId } } = message
        const { id: channelId } = channel

        await suggestionSchema.findOneAndUpdate({
            _id: guildId,
        }, {
            _id: guildId,
            channelId: channelId
        }, {
            upsert: true
        })

        message.reply(` The suggestions channel has been set to ${channel}`)

        fetchSuggestionChannels(guildId)
    }
}