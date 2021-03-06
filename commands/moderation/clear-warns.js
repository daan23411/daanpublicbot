const warnSchema = require('@schemas/warn-schema')

module.exports = {
 
            name: 'clearwarns',
            aliases: ['clearw', 'cwarn', 'cw', 'delwarn', 'delw'],
            category: 'Moderation',
            description: 'Clear someones warns.',
            permissions: [
                "KICK_MEMBERS"    
            ],
            maxArgs: 1,
            expectedArgs: '<target mention>',
            async callback({message, args}) {
                const target = message.mentions.users.first()
                if (!target) {
                    return message.reply('Please specify someone to clear the warns from')
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

    