const economy = require('../../indexFiles/economy')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  description: 'Add coins to someones balance',
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add coins to.')
      return
    }

    const coins = arguments[1]

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `You have given <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)!`
    )
  },
}