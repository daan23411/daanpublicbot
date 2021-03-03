module.exports = {
    commands: 'kick',
    expectedArgs: '<@>',
    permissionError: 'You need kick permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if( member.hasPermission("ADMINISTRATOR") || 
            member.hasPermission("KICK_MEMBERS") 
            ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`✅ - You succesfully been kicked ${tag}`)
            } else {
                message.channel.send(`❌ - You did not specify a user to kick ${tag}.`)
            }
        } else {
            return message.channel.send(`❌ - You do not have enough permissions to execute this command ${tag}!`);
        }
    },
    permissions: 'KICK_MEMBERS',
    requiredRoles: [],
  }