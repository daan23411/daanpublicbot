const economy = require('../../indexFiles/economy')

module.exports = {
    commands: ['balance', 'bal'],
    expectedArgs: '[target user\'s @]',
    maxArgs: 1,
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const coins = await economy.getCoins(guildId, userId)

        message.reply(`That user has ${coins} coins!`)
    }
  }