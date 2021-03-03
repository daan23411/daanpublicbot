const ticketch = require('../schemas/ticketch-schema')
const mongo = require('../mongo')
const check = '✅'

module.exports = async (message, arguments, text) => {
    const cache = {}
    const { guild, member} = message

    let data = cache[guild.id]

    if (!data) {
      await mongo().then(async (mongoose) => {
        try {
          const result = await ticketch.findOne({ _id: guild.id })

          cache[guild.id] = data = [result.channelId]
        } finally {
          mongoose.connection.close()
        }
      })
    }

    await mongo().then(async (mongoose) => {
      try {
        await ticketch.findOneAndUpdate(
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

    const channelId = data[0]
    const channel = guild.channels.cache.get(channelId)
    channel.send(`A new ticket has been opened by <@${member.id}>! \n\nWith the reason of "${text}" \nClick the ${check} if this issue has been resolved`)
    .then((message) => {
      message.react(check)
    })
}