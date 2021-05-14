 

module.exports = {
    name: 'giverole',
    aliases: ['addrole', 'grole'],
    category: 'Roles',
    description: 'Give a user a specific role',
    permissions: [
        "MANAGE_ROLES"
    ],
    minArgs: 2,
    maxArgs: 2,
    async callback(message, args) {

        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            return message.reply('Please specify someone to give a role to.')
        }

        args.shift()

        const roleName = args.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            return message.reply(`There is no role with the name "${roleName}"`)
        }

        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)

        message.reply(`That user now has the ${roleName} role`)
    }
}