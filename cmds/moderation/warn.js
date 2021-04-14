const warnSchema = require('@schemas/warn-schema')
const Commando = require('discord.js-commando')

module.exports = class WarnCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'moderation',
            memberName: 'warn',
            description: 'Warn a user if needed.',
            argsType: 'multiple',
            userPermissions: [
                'KICK_MEMBERS',
            ]
        })
    }

    async run(message, args) {
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