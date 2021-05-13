
const amongUsSchema = require('@schemas/among-us-schema')
const channelNameStart = 'Among Us -'
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'amongus',
    category: 'Games',
    description: 'Play some among us',
    minArgs: 2,
    maxArgs: 2,
    aliases: ['au', 'among-us', 'among-sus'],
    callback: async(message, args, client) => {
        client.on('voiceStateUpdate', oldState => {
            const { channel } = oldState

            if (channel && channel.name.startsWith(channelNameStart) && channel.members.size === 0) {
                channel.delete()
            }
        })

        const [region, code] = args
        if (!region) {
            return message.reply(`Please specify a region.`)
        }
        if (!code) {
            return message.reply(`Please specify a code.`)
        }

        const { channel, guild, member } = message

        const categoryDocument = await amongUsSchema.findOne({
            _id: guild.id
        })

        if (!categoryDocument) {
            return message.reply(`Can't find category ID due to it not being setup properly.`)
        }

        const channelName = `${channelNameStart} ${code}`
        await guild.channels.create(channelName, {
            type: 'voice',
            userLimit: 10,
            parent: categoryDocument.categoryId
        })

        const embed = new MessageEmbed()
            .setAuthor(
                member.nickname || member.displayName,
                member.user.displayAvatarURL()
            )
            .setDescription(
                `${member} created a new Among Us Game! Join channel: "${channelName}"`
            )
            .addField('Region:', region)
            .addField('Code:', code)
            .setColor('RANDOM')

        channel.send(embed)
    }






}