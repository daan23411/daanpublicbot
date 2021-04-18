const economy = require('@features/economy')
const Commando = require('discord.js-commando')

module.exports = class AddBalanceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'addbalance',
            aliases: ['addbal'],
            group: 'economy',
            memberName: 'addbalance',
            description: 'add coins to someone\'s balance.',
            argsType: 'multiple',
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message, args) {
        const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add coins to.')
      return
    }

    const coins = args[1]

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `You have given <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)!`
    )
    }
}