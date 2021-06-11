const invitenotiSchema = require('@schemas/invitenoti-schema')

module.exports = {

  name: 'setinvite',
  category: 'Setup',
  description: 'Setup the welcome and invite logger.',
  argsType: 'single',
  permissions: [
    'ADMINISTRATOR'
  ],
  async callback({message, args}) {
    const cache = {}

    const { member, channel, content, guild } = message

    let text = content

    const split = text.split(' ')

    if (split.length < 2) {
      channel.send('Please provide a welcome message')
      return
    }

    split.shift()
    text = split.join(' ')

    cache[guild.id] = [channel.id, text]

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
  }
}