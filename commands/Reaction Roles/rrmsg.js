const messageSchema = require('@schemas/message')

module.exports = {
    minArgs: 1,
    expectedArgs: '[Channel tag] <Message text>',
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Reaction Roles',
    description: 'Create the message for the reaction roles',
    testOnly: true,
    callback: async ({message, args}) => {
        const { guild, mentions} = message
        const { channels } = mentions
        const targetChannel = channels.first() || message.channel

        if (channels.first()) {
            args.shift()
        }

        const text = args.join(' ')

        const newMessage = await targetChannel.send(text)

        if(guild.me.hasPermission('MANAGE_MESSAGES')) {
            message.delete()
        }

        if(!guild.me.hasPermission('MANAGE_ROLES')) {
            message.reply('The bot requires access to the MANAGE_ROLES permission in order to give/remove roles.')
            return
        }

        // TODO: add the guild ID and the message to our own cache

        new messageSchema({
            guildId: guild.id,
            channelId: targetChannel.id,
            messageId: newMessage.id,
        })
            .save()
            .catch(() => {
                message.reply('Failed to save to the database, please report this!')
                    .then((message) => {
                        message.delete({
                            timeout: 1000 * 10
                        })
                    })
            })
    }

}