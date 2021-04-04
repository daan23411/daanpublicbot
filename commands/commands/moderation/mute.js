const giveRole = require('@features/mute')

module.exports = {
        commands: 'mute',
        expectedArgs: '<@> <duration number> <m, h, d or life>',
        permissionError: 'You need manage roles permissions to run this command',
        minArgs: 3,
        description: 'Mute a user.',
        maxArgs: 3,
        callback: async (message, arguments, text) => {
            const syntax = '!mute <@> <duration as a number> <m, h, d, or life>'

            const { member, channel, content, mentions, guild } = message
        
            if (!member.hasPermission('ADMINISTRATOR')) {
              channel.send('You do not have permission to run this command.')
              return
            }
        
            const split = content.trim().split(' ')
        
            if (split.length !== 4) {
              channel.send('Please use the correct command syntax: ' + syntax)
              return
            }
        
            const duration = split[2]
            const durationType = split[3]
        
            if (isNaN(duration)) {
              channel.send('Please provide a number for the duration. ' + syntax)
              return
            }
        
            const durations = {
              m: 60,
              h: 60 * 60,
              d: 60 * 60 * 24,
              life: -1,
            }
        
            if (!durations[durationType]) {
              channel.send('Please provide a valid duration type. ' + syntax)
              return
            }
        
            const seconds = duration * durations[durationType]
        
            const target = mentions.users.first()
        
            if (!target) {
              channel.send('Please tag a user to mute.')
              return
            }
        
            const { id } = target
        
            const targetMember = guild.members.cache.get(id)
            giveRole(targetMember)
        
            const redisClient = await redis()
            try {
              const redisKey = `${redisKeyPrefix}${id}-${guild.id}`
        
              if (seconds > 0) {
                redisClient.set(redisKey, 'true', 'EX', 10)
              } else {
                redisClient.set(redisKey, 'true')
              }
            } finally {
              redisClient.quit()
            }
        },
        permissions: 'MANAGE_ROLES',
        requiredRoles: [],
      }