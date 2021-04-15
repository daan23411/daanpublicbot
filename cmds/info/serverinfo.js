const Discord = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class ServerInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            guildOnly: true,
            aliases: ['si'],
            group: 'info',
            memberName: 'serverinfo',
            description: 'Displays the server information of the current guild'
        })
    }

    async run(message, args) {
        const { guild } = message
        const { name, region, memberCount, owner, afkTimeout, createdTimestamp, premiumTier, vanityURLCode } = guild
        const icon = guild.iconURL()

        let embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region
                },
                {
                    name: 'Members',
                    value: memberCount
                },
                {
                    name: 'Owner',
                    value: owner.user.tag
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60
                }, 
                {
                    name: 'Boost Tier',
                    value: premiumTier
                },
                {
                    name: 'Created At',
                    value: new Date(createdTimestamp).toLocaleDateString()
                }, {
                    name: 'Vanity URL',
                    value: vanityURLCode || 'None'
                })
            .setColor('RANDOM')
            .setTimestamp();


        message.channel.send(embed)
    }
}