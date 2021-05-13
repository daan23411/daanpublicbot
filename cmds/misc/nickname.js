const Commando = require('discord.js-commando')

module.exports = {

    name: 'nickname',
    aliases: ['nick'],
    category: 'Misc',
    description: 'Change someone\'s nickname or reset it.',
    permissions: [
        "MANAGE_NICKNAMES"
    ],
    minArgs: 1,
    maxArgs: 2,
    async callback(message, args) {
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