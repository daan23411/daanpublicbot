const warnSchema = require('@schemas/warn-schema')
const Commando = require('discord.js-commando')

module.exports = {
 
            name: 'clearwarns',
            aliases: ['clearw', 'cwarn', 'cw', 'delwarn', 'delw'],
            category: 'Moderation',
            description: 'Clear someones warns.',
            permissions: [
                "KICK_MEMBERS"    
            ],
            async callback(message, args) {
                const target = message.mentions.users.first()
                if (!target) {
                    return message.reply('Please specify someone to warn')
                }
        
                const guildId = message.guild.id
                const userId = target.id
        
        
                await warnSchema.findOneAndRemove({
                    guildId,
                    userId
                })
        
                message.reply(`I have cleared <@${target.id}>'s warns`)
            }
        }

    