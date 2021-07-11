const { MessageEmbed } = require('discord.js')
const { author } = require('@root/package.json')
 

module.exports = {
    name: 'userinfo',
    guildOnly: false,
    category: 'Info',
    description: 'Displays useful information about a user',
    expectedArgs: '<target mention>',
    callback: async ({message, client}) => {

        const { guild } = message

        const user = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
            .setAuthor(`Information about ${client.user.username}`, client.user.displayAvatarURL())
            .addFields({
                name: 'User Tag',
                value: user.tag
            }, {
                name: 'Is bot',
                value: user.bot
            }, {
                name: 'Nickname',
                value: member.nickname || 'Has none'
            }, {
                name: 'Joined at',
                value: new Date(member.joinedTimestamp).toLocaleDateString()
            }, {
                name: 'Account created at',
                value: new Date(user.createdTimestamp).toLocaleDateString()
            }, {
                name: 'Custom Roles',
                value: member.roles.cache.size - 1
            }, {
                name: 'Color (HEX)',
                value: member.displayHexColor
            }, {
                name: 'Kick- / banable',
                value: member.kickable
            })
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`Made with love by ${author}`)

        message.channel.send(embed)
    }
}