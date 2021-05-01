const Commando = require('discord.js-commando')

module.exports = class RemoveRoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'removerole',
            aliases: ['delrole', 'rrole', 'deleterole'],
            group: 'roles',
            memberName: 'removerole',
            description: 'Remove a user from a specific role.',
            argsType: 'multiple',
            userPermissions: [
                'MANAGE_ROLES'
            ],
            clientPermissions: [
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
        if(!role) {
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