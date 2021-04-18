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