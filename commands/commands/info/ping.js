const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    description: 'Displays the bot\'s latency and the discord API latency',
    callback: (message, arguments, text, client) => {
      message.reply('Calculating ping...').then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        let embed = new MessageEmbed()
        .setTitle(`Ping for ${client.user.username}`)
        .addField(`Bot latency: `, ping + ` MS`)
        .addField(`API Latency: `, client.ws.ping + ` MS`)
        .setTimestamp()
        .setFooter(`Hey! I am ${client.user.username} and thanks for inviting me!`)

        resultMessage.edit(`Ping for ${client.user.username}:`, embed)
      })
    },
  }