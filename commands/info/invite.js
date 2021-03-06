const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'invite',
    description: 'Invite me to your discord server!',
    callback: (message, client) => {
       let embed = new MessageEmbed()
       .setTitle('Invite Me')
       .setDescription('Nice that you want to invite me to your server! \n\nLink: https://discord.com/api/oauth2/authorize?client_id=757520713790914560&permissions=8&scope=bot')
       .setFooter(`I am in ${client.guilds.cache.size} server(s) as of right now.`)
       .setColor('#00ff00')
       .setTimestamp()
       message.reply(embed)
    }
}