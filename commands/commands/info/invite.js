const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'invite',
    description: 'Invite me to your discord server!',
    callback: (message, arguments, text, client) => {
       let embed = new MessageEmbed()
       .setAuthor(client.user.username, client.user.displayAvatarURL())
       .setTitle('Invite Me')
       .setDescription('Nice that you want to invite me to your server! \n\nLink: https://discord.com/api/oauth2/authorize?client_id=757520713790914560&permissions=8&scope=bot')
       .setColor('#00ff00')
       .setFooter(`I am in ${client.guilds.cache.size} servers as of right now!`)
       .setThumbnail(client.user.displayAvatarURL())
       .setTimestamp()
       message.reply(embed)
    }
}