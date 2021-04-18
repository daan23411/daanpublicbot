const Commando = require('discord.js-commando')

module.exports = class SlowmodeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            aliases: ['slow'],
            group: 'misc',
            memberName: 'slowmode',
            description: 'Sets the slowmode of a channel',
            argsType: 'multiple'
        })
    }

    async run(message, args) {
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

    //['testing','hello','world']
    //.join(' ')
    //testing hello world

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.reply(`The slowmode for this channel has been set to ${duration} with the reason of ${args.join(' ')}`)
    }
}