module.exports = {
    commands: 'hasrole',
    description: "Check if someone has a specific role",
    minArgs: 2,
    expectedArgs: "<User's @> <Role Name>",
    permissions: "MANAGE_ROLES",
    callback: async (message, arguments) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            return message.reply('Please specify someone to give a role to.')
        }

        arguments.shift()

        const roleName = arguments.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role) {
            return message.reply(`There is no role with the name "${roleName}"`)
        }
        
        const member = guild.members.cache.get(targetUser.id)
        if (member.roles.cache.get(role.id)) {
            
            message.reply(`That user  has the ${roleName} role`)
        } else {
            message.reply(`That user doesn't have the ${roleName} role`)
        }
    }
}