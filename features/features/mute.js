const redis = require('@util/redis')

module.exports = (message, arguments, text, client) => {
  const redisKeyPrefix = 'muted-'

  redis.expire((message) => {
    if (message.startsWith(redisKeyPrefix)) {
      const split = message.split('-')

      const userId = split[1]
      const guildId = split[2]

      const guild = client.guilds.cache.get(guildId)
      const member = guild.members.cache.get(userId)

      const role = getRole(guild)
      
      member.roles.remove(role)
    }
  })

  const getRole = (guild) => {
      return guild.roles.cache.find((role) => role.name === 'Muted')
  }

  const giveRole = (member) => {
    const role = getRole(member.guild)
    if (role) {
      member.roles.add(role)
    }
  }

  const onJoin = async (member) => {
    const { id, guild } = member

    const redisClient = await redis()
    try {
      redisClient.get(`${redisKeyPrefix}${id}-${guild.id}`, (err, result) => {
        if (err) {
          console.error('Redis GET error:', err)
        } else if (result) {
          giveRole(member)
        }
      })
    } finally {
      redisClient.quit()
    }
  }

  client.on('guildMemberAdd', (member) => {
    onJoin(member)
  })
}