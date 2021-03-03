const ticketch = require("../../schemas/ticketch-schema")
const mongo = require('../../mongo')

module.exports = {
  commands: 'setticket',
  expectedArgs: '<channelid>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 1,
  maxArgs: 2000,
  callback: async (message) => {
    const cache = {}

    const { channel, member, guild } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('You do not have permission to run this command.')
      return
    }

    cache[guild.id] = [channel.id]

    await mongo().then(async (mongoose) => {
      try {
        await ticketch.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id
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
}