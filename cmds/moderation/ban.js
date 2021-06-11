const discord = require('discord.js')

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Ban a member from your server.',
    permissions: [
        'BAN_MEMBERS'
    ],
    minArgs: 1,
    maxArgs: 1,
    async callback({message}) {
        const target = message.mentions.users.first()
        if (!target) {
            return message.reply('Please specify someone to ban! I can\'t ban thin air...')
        }

        const { guild } = message

        const member = guild.members.cache.get(target.id)
        if (member.banable) {
            member.ban()
            const kickEmbed = new discord.MessageEmbed()
                .setTitle('Ban Succesfull!')
                .setDescription(`You have banned succesfully <@${member.id}> from **${guild.name}**`)
                .setColor('#00ff00')
                .setFooter(`Action done by ${message.author.username}`)
                .setTimestamp()
            message.reply(kickEmbed)
        } else {
            const failEmbed = new discord.MessageEmbed()
                .setTitle('Kick unsuccessfull!')
                .setDescription(`You have unsuccesfully banned <@${member.id}> from **${guild.name}**`)
                .setColor('#ff0000')
                .setFooter(`Action tried by ${message.author.username}`)
                .setTimestamp()
            message.reply(failEmbed)
        }
    }
}