const { MessageEmbed } = require('discord.js')
const { author } = require('@root/package.json')
const Commando = require('discord.js-commando')

module.exports = class BotInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'info',
            memberName: 'userinfo',
            description: 'Displays useful information about a user',
        })
    }

    run = async (message) => {
        if (message.channel.type === 'dm') {
            return message.channel.send(`This command cannot be executed within a DM.`)
        }

        const { guild } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
            .setAuthor(`Information about ${this.client.user.username}`, this.client.user.displayAvatarURL())
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