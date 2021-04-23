const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nickname',
            aliases: ['nick'],
            group: 'misc',
            memberName: 'nickname',
            description: 'Change someone\'s nickname or reset it.',
            userPermissions: [
                "MANAGE_NICKNAMES"    
            ],
            argsType: 'multiple'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        const member = message.guild.members.cache.get(target.id)

        if (args.length === 1) {
            member.setNickname(target.username)
            return message.reply(`You have reset the nickname of <@${target.id}>`)
        }

        args.shift()
        const nickname = args.join(' ')

        member.setNickname(nickname)
        message.reply(`You changed the nickname of <@${target.id}> to ${nickname}!`)
    }
}