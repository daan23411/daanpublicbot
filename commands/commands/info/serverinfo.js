const Discord = require('discord.js')

module.exports = {
    commands: ['serverinfo', 'si'],
    description: 'Get some info about the server.',
    callback: (message, arguments, text, client) => {
        const { guild } = message
        con

        const { name, region, memberCount, owner, afkTimeout, createdAt, premiumTier, vanityURLCode } = guild
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
                    value: createdAt
                })
            .setColor('RANDOM')
            .setTimestamp();


        message.channel.send(embed)
    }
}