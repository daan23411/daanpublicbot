const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'support-server',
    category: 'Info',
    aliases: ['ss', 'sserver', 'supports', 'supsrv'],
    description: 'See the invite link to my support server.',
    async callback({message, args}) {
        let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle('Join my support server!')
            .setDescription(`Nice that you want to join my support server! \n\nLink: https://discord.gg/H8GyHTuZxM \n\nThanks for supporting Doubt by inviting him! We really appreciate you and your feedback. If you would like to suggest any features please leave it in #suggestions in the Doubt Support Server!`)
            .setColor('#00ff00')
            .setFooter(`I am in ${client.guilds.cache.size} servers as of right now!`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
        message.reply(embed)
    }
}