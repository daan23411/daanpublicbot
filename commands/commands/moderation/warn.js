const warnSchema = require('@schemas/warn-schema')

module.exports = {
    commands: 'warn',
    minArgs: '2',
    expectedArgs: '<Mention> <reason>',
    callback: async (message, arguments) => {
        const target = message.mentions.users.first()
        if (!target) {
            return message.reply('Please specify someone to warn')
        }

        arguments.shift()

        const guildId = message.guild.id
        const userId = message.member.id
        const reason = arguments.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        }


        await warnSchema.findOneAndUpdate({
            guildId,
            userId
        }, {
            guildId,
            userId,
            $push: {
                warnings: warning
            }
        }, {
            upsert: true
        })
    }
}