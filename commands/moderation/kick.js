const discord = require('discord.js')

module.exports = {

    name: 'kick',
    category: 'Moderation',
    description: 'Kick a member from your server.',
    permissions: [
        'KICK_MEMBERS'
    ],
    expectedArgs: '<target mention> <reason>',
    minArgs: 2,
    maxArgs: 2,
    async callback({message, args}) {
        const target = message.mentions.users.first()
        if (!target) {
            return message.reply('Please specify someone to kick! I can\'t kick thin air...')
        }

        const reason = args.shift()
        if(!reason) {
            return message.reply('Please specify a reason to kick')
        }

        const { guild } = message

        const member = guild.members.cache.get(target.id)
        if (member.kickable) {
            member.kick()
            const kickEmbed = new discord.MessageEmbed()
                .setTitle('Kick Succesfull!')
                .setDescription(`You have kicked succesfully <@${member.id}> from **${guild.name}**`)
                .setColor('#00ff00')
                .setFooter(`Action done by ${message.author.username}`)
                .setTimestamp()
            message.reply(kickEmbed)
        } else {
            const failEmbed = new discord.MessageEmbed()
                .setTitle('Kick unsuccessfull!')
                .setDescription(`You have unsuccesfully kicked <@${member.id}> from **${guild.name}**`)
                .setColor('#ff0000')
                .setFooter(`Action tried by ${message.author.username}`)
                .setTimestamp()
            message.reply(failEmbed)
        }
    }
}