const invitenotiSchema = require("../../schemas/invitenoti-schema")
const mongo = require('../../mongo')

module.exports = {
  commands: 'setinvite',
  expectedArgs: '<message>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 1,
  description: 'Setup the invite channel',
  maxArgs: 2000,
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

     try {
        await invitenotiSchema.findOneAndUpdate(
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
      } catch (err) {
        console.log(err)
      }
    
  },
  permissions: 'ADMINISTRATOR'
}