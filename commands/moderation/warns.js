const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
    commands: 'warns',
    minArgs: '1',
    expectedArgs: '<Mention>',
    description: 'Get a list of someones warns.',
    callback: async (message, arguments, text) => {
        const target = message.mentions.users.first()
        if(!target) { 
            return message.reply('Please specify someone to warn')
        }

        const guildId = message.guild.id
        const userId = message.member.id

        await mongo().then(async mongoose => {
            try {
                const results = await warnSchema.findOne({
                    guildId,
                    userId
                })

                let reply = `Previous warnings for <@${userId}>\n\n`

                for (const warning of results.warnings) {
                    const { author, timestamp, reason} = warning

                    reply += `By ${author} on ${new Date(timestamp).toLocaleDateString()} for "${reason}"\n`

                    message.reply(reply)
                } 
            } finally {
                mongoose.connection.close
            }
        })
    }
}