const Commando = require('discord.js-commando')
const discord = require('discord.js')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a member from your server.',
            clientPermissions: [
                'BAN_MEMBERS'
            ],
            userPermissions: [
                'BAN_MEMBERS'
            ]
        })
    }

    async run(message) {
     const target = message.mentions.users.first()
     if(!target) {
         return message.reply('Please specify someone to ban! I can\'t ban thin air...')
     }

     const { guild } = message

     const member = guild.members.cache.get(target.id)
     if(member.banable) {
         member.ban()
         const kickEmbed = new discord.MessageEmbed()
         .setTitle('Ban Succesfull!')
         .setDescription(`You have banned succesfully <@${member.id}> from **${guild.name}**`)
         .setColor('#00ff00')
         .setFooter(`Action done by ${message.author.username}`)
         .setTimestamp()
         message.reply(kickEmbed)
     } else {
        const failEmbed = new discord.MessageEmbed()
         .setTitle('Kick unsuccessfull!')
         .setDescription(`You have unsuccesfully banned <@${member.id}> from **${guild.name}**`)
         .setColor('#ff0000')
         .setFooter(`Action tried by ${message.author.username}`)
         .setTimestamp()
         message.reply(failEmbed)
     }
    }
}