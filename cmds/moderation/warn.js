const warnSchema = require('@schemas/warn-schema')

module.exports = {
    name: 'warn',
    category: 'Moderation',
    description: 'Warn a user if needed.',
    minArgs: 2,
    maxArgs: 2,
    permissions: [
        "KICK_MEMBERS"
    ],
    async callback({message, args}) {
        const target = message.mentions.users.first()
        if (!target) {
            return message.reply('Please specify someone to warn')
        }
        if (args.length < 2) {
            return message.reply('Please specify a reason to warn this user')
        }

        args.shift()

        const guildId = message.guild.id
        const userId = target.id
        const reason = args.join(' ')

        const warning = {
            author: message.author.tag,
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

        message.reply(`I have warned <@${target.id}> for ${reason}`)
    }
}