const warnSchema = require('@schemas/warn-schema')

module.exports = {

  name: 'warns',
  category: 'Moderation',
  permissions: [
    "KICK_MEMBERS"
  ],
  description: 'See someones warns.',
  maxArgs: 1,
  minArgs: 1,
  expectedArgs: '<target mention>',
  async callback({message, args}) {
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