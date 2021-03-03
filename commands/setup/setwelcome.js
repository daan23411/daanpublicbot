const welcomeSchema = require("../../schemas/welcome-schema")
const mongo = require('../../mongo')

module.exports = {
  commands: 'setwelcome',
  expectedArgs: '<message>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message) => {
    const cache = {}

    const { member, channel, content, guild } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('You do not have permission to run this command.')
      return
    }

    let text = content

    const split = text.split(' ')

    if (split.length < 2) {
      channel.send('Please provide a welcome message')
      return
    }

    split.shift()
    text = split.join(' ')

    cache[guild.id] = [channel.id, text]

    await mongo().then(async (mongoose) => {
      try {
        await welcomeSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            text,
          },
          {
            upsert: true,
          }
        )
      } finally {
        mongoose.connection.close()
      }
    })
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: ['TESTER']
}