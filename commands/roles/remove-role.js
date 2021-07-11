module.exports = {
    name: 'removerole',
    aliases: ['delrole', 'rrole', 'deleterole'],
    category: 'Roles',
    description: 'Remove a user from a specific role.',
    permissions: [
        'MANAGE_ROLES'
    ],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<target mention> <role to remove>',
    async callback({message, args}) {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            return message.reply('Please specify someone to remove a role from.')
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
            member.roles.remove(role)
            message.reply(`That user no longer has the ${roleName} role`)
        } else {
            message.reply(`That user doesn't have the ${roleName} role`)
        }
    }
}