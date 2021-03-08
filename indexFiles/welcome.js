const mongo = require('../mongo')
const command = require('../command')
const welcomeSchema = require('../schemas/welcome-schema')

module.exports = (client) => {
  //!setwelcome <message>
  const cache = {} // guildId: [channelId, text]

  const onJoin = async (member) => {
    const { guild } = member

    let data = cache[guild.id]

    if (!data) {
      console.log('FETCHING FROM DATABASE')

      await mongo().then(async (mongoose) => {
        try {
          const result = await welcomeSchema.findOne({ _id: guild.id })

          cache[guild.id] = data = [result.channelId, result.text]
        } finally {
          mongoose.connection.close()
        }
      })
    }

    const channelId = data[0]
    const channel = member.guild.channels.cache.get(channelId)
    const text = data[1]

    channel.send(text.replace(/<@>/g, `<@${member.id}>`))
  }

  

  client.on('guildMemberAdd', (member) => {
    onJoin(member)
  }) 
}