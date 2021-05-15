const { MessageEmbed } = require('discord.js')
 

module.exports = {

    name: 'serverinfo',
    guildOnly: true,
    aliases: ['si'],
    category: 'Info',
    description: 'Displays the server information of the current guild',
    async callback(message, client) {

        let embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("**Server Information**")
            .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(`🎫 Name of server:`, message.guild.name, true)
            .addField(`🆔 ID of server`, message.guild.id, true)
            .addField(`👑 Owner of server`, message.guild.owner, true)
            .addField(`🗺 Region of server`, message.guild.region, true)
            .addField(`👥 Member total`, message.guild.members.cache.size, true)
            .addField(`🤖 Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
            .addField(`🚶 Weights:`, message.guild.members.cache.filter(member => !member.user.bot).size, true)
            .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
            .addField(`👻 Animated Emoji\'s:`, message.guild.emojis.cache.filter(emoji => emoji.animated).size, true)
            .addField(`💬 Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
            .addField(`🎤 Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
            .addField(`👔 Total Amount of Roles:`, message.guild.roles.cache.size, true)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
        message.channel.send(embed);
    }
}