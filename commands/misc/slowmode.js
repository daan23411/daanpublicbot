module.exports = {
      name: 'slowmode',
      aliases: ['slow'],
      category: 'Misc',
      description: 'Sets the slowmode of a channel',
      permissions: [
        "MANAGE_CHANNELS"
      ],
      minArgs: 0,
      maxArgs: 1,
      async callback({message, args}) {
        const { channel } = message

        if (args.length < 2) {
          message.reply('Please provide a duration and a reason')
          return
        }

        let duration = args.shift().toLowerCase()
        if (duration === 'off') {
          duration = 0
        }

        if (isNaN(duration)) {
          message.reply(
            'Please provide either a number of seconds or the word "off"'
          )
          return
        }

        channel.setRateLimitPerUser(duration, args.join(' '))
        message.reply(`The slowmode for this channel has been set to ${duration} with the reason of ${args.join(' ')}`)
      }
    }