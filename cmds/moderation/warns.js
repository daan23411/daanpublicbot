const Commando = require('discord.js-commando')

module.exports = class WarnsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'warns',
            group: 'moderation',
            memberName: 'warns',
            description: 'See someones warns.',
            argsType: 'single'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        if (!target) {
            return message.reply('Please specify someone to warn')
        }

        const guildId = message.guild.id
        const userId = message.member.id


        const results = await warnSchema.findOne({
            guildId,
            userId
        })

        let reply = `Previous warnings for <@${userId}>\n\n`

        for (const warning of results.warnings) {
            const { author, timestamp, reason } = warning

            reply += `By ${author} on ${new Date(timestamp).toLocaleDateString()} for "${reason}"\n`

            message.reply(reply)
        }
    }
}