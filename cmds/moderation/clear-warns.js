const warnSchema = require('@schemas/warn-schema')
const Commando = require('discord.js-commando')

module.exports = class ClearWarnCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clearwarns',
            aliases: ['clearw', 'cwarn', 'cw', 'delwarn', 'delw'],
            group: 'moderation',
            memberName: 'clearwarns',
            description: 'Clear someones warns.',
            argsType: 'single',
            cientPermissions: [
                "KICK_MEMBERS"    
            ],
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

        const guildId = message.guild.id
        const userId = target.id


        await warnSchema.findOneAndRemove({
            guildId,
            userId
        })

        message.reply(`I have cleared <@${target.id}>'s warns`)
    }
}