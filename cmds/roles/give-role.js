const Commando = require('discord.js-commando')

module.exports = class GiveRoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'giverole',
            aliases: ['addrole', 'grole'],
            group: 'roles',
            memberName: 'giverole',
            description: 'Give a user a specific role',
            argsType: 'multiple',
            userPermissions: [
                'MANAGE_ROLES'
            ]
        })
    }

    async run(message, args) {
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