const Commando = require('discord.js-commando')

module.exports = class HasRoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'hasrole',
            aliases: ['hr', 'hasr', 'hrole'],
            group: 'roles',
            memberName: 'hasrole',
            description: 'Check if someone has a specific role',
            argsType: 'multiple'
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
            
            message.reply(`That user  has the ${roleName} role`)
        } else {
            message.reply(`That user doesn't have the ${roleName} role`)
        }
    }
}