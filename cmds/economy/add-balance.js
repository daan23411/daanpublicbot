const economy = require('@features/economy')

module.exports = {
    name: 'addbalance',
    aliases: ['addbal'],
    category: 'Economy',
    description: 'add coins to someone\'s balance.',
    permissions: [
        'ADMINISTRATOR',
    ],
    callback: async(message, args) => {
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



