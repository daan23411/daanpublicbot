const Levels = require('discord-xp')

module.exports = (client) => {
  client.on('message', async (message) => {
    if (message.author.bot) {
      return
    }
    if (message.channel.type === 'dm') {
      return
    }
    if (message.channel.id === '845335769785696315') {
      return
    }

    const randomXP = Math.floor(Math.random() * 10) + 1
    const hasLeveldUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP)

    if (hasLeveldUP) {
      const user = await Levels.fetch(message.author.id, message.guild.id)
      message.channel.send(`${message.member} you have leveled up to ${user.level}!`)
    }
  })

}

module.exports.config = {
  displayName: 'levels',

  dbName: 'LEVELS',

  loadDBFirst: true
}
