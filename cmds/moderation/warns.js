const Commando = require('discord.js-commando')
const warnSchema = require('@schemas/warn-schema')

module.exports = class WarnsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'warns',
      group: 'moderation',
      memberName: 'warns',
      clientPermissions: [
        "KICK_MEMBERS"
      ],
      userPermissions: [
        "KICK_MEMBERS"
      ],
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
    const userId = target.id

    const results = await warnSchema.findOne({
      guildId,
      userId,
    })
    //   message.reply('That user doesn\'t have any warns')
    //   return

    if (results) {
      let reply = `Previous warnings for <@${userId}>:\n\n`

      for (const warning of results.warnings) {
        const { author, timestamp, reason } = warning

        reply += `By ${author} on ${new Date(
          timestamp
        ).toLocaleDateString()} for "${reason}"\n\n`
      }

      message.reply(reply)
      return
    } else {
      message.reply(`That user doesn't have any warns`)
    }


  }
}