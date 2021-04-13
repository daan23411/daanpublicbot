const Commando = require('discord.js-commando')
const discord = require('discord.js')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick a member from your server.',
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS'
            ]
        })
    }

    async run(message) {
     const target = message.mentions.users.first()
     if(!target) {
         return message.reply('Please specify someone to kick! I can\'t kick thin air...')
     }

     const { guild } = message

     const member = guild.members.cache.get(target.id)
     if(member.kickable) {
         member.kick()
         const kickEmbed = new discord.MessageEmbed()
         .setTitle('Kick Succesfull!')
         .setDescription(`You have kicked succesfully <@${member.id}> from **${guild.name}**`)
         .setColor('#00ff00')
         .setFooter(`Action done by ${message.author.username}`)
         .setTimestamp()
         message.reply(kickEmbed)
     } else {
        const failEmbed = new discord.MessageEmbed()
         .setTitle('Kick unsuccessfull!')
         .setDescription(`You have unsuccesfully kicked <@${member.id}> from **${guild.name}**`)
         .setColor('#ff0000')
         .setFooter(`Action tried by ${message.author.username}`)
         .setTimestamp()
         message.reply(failEmbed)
     }
    }
}