 

module.exports = {
    name: 'hasrole',
    aliases: ['hr', 'hasr', 'hrole'],
    category: 'Roles',
    description: 'Check if someone has a specific role',
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
        if (member.roles.cache.get(role.id)) {

            message.reply(`That user  has the ${roleName} role`)
        } else {
            message.reply(`That user doesn't have the ${roleName} role`)
        }
    }
}