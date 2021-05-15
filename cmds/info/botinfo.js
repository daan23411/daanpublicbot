const { MessageEmbed } = require('discord.js')
const PrettyMilliseconds = require('pretty-ms')
const { version, author } = require('@root/package.json')

module.exports = {

    name: 'botinfo',
    guildOnly: true,
    category: 'Info',
    description: 'Displays useful information about the bot',
    callback: async (message, client) => {
        const embed = new MessageEmbed()
            .setAuthor(`Information about ${client.user.username}`, client.user.displayAvatarURL())
            .addFields({
                name: 'Bot Tag',
                value: client.user.tag
            }, {
                name: 'Version',
                value: version
            }, {
                name: "Server's command prefix",
                value: message.guild.commandPrefix
            }, {
                name: 'Uptime',
                value: PrettyMilliseconds(client.uptime)
            }, {
                name: 'Owner',
                value: author
            }, {
                name: 'Server count',
                value: client.guilds.cache.size
            })
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`Made with love by ${author}`)

        message.channel.send(embed)
    }
}