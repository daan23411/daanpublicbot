const muteSchema = require('@schemas/mute-schema')

module.exports = {

      name: 'unmute',
      category: 'Moderation',
      userPermissions: ['MANAGE_ROLES'],
      permissions: [
        "MANAGE_ROLES"    
    ],
      description: 'Unmutes a user',
      minArgs: 2,
      maxArgs: 2,
      expectedArgs: '<target mention>',
  callback: async ({message, args}) => {
    //!unmute @
    //!unmute ID

    const { guild } = message

    let id = ''

    const target = message.mentions.users.first()
    if (target) {
      id = target.id
    } else {
      id = args[0]
    }

    const result = await muteSchema.updateOne(
      {
        guildId: guild.id,
        userId: id,
        current: true,
      },
      {
        current: false,
      }
    )

    if (result.nModified === 1) {
      const mutedRole = guild.roles.cache.find((role) => {
        return role.name === 'Muted'
      })

      if (mutedRole) {
        const guildMember = guild.members.cache.get(id)
        guildMember.roles.remove(mutedRole)
      }

      message.reply(`You unmuted <@${id}>`)
    } else {
      message.reply('That user is not muted')
    }
  }
}