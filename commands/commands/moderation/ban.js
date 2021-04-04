module.exports = {
    commands: 'ban',
    expectedArgs: '<@>',
    minArgs: 1,
    maxArgs: 1,
    description: 'Ban a user.',
    permissions: ['BAN_MEMBERS'],
    callback: (message, client) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if( member.hasPermission("ADMINISTRATOR") || 
            member.hasPermission("BAN_MEMBERS") 
            ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`✅ - You succesfully banned <@${target.id}>`)
            } else {
                message.channel.send(`❌ - You did not specify a user to ban <@${target.id}>.`)
            }
        } else {
            return message.channel.send(`❌ - You do not have enough permissions to execute this command <@${member.id}>!`);
        }
    }
}