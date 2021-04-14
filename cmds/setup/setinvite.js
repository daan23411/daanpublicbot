const invitenotiSchema = require('@schemas/invitenoti-schema')
const Commando = require('discord.js-commando')

module.exports = class SetInviteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setinvite',
            group: 'setup',
            memberName: 'setinvite',
            description: 'Setup the welcome and invite logger.',
            argsType: 'single',
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message, args) {
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