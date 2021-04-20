const Commando = require('discord.js-commando')
const amongUsSchema = require('@schemas/among-us-schema')
const channelNameStart = 'Among Us -'
const { MessageEmbed } = require('discord.js')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'amongus',
            group: 'games',
            memberName: 'amongus',
            description: 'Adds two numbers together',
            argsType: 'multiple',
            aliases: ['au', 'among-us', 'among-sus']
        })

        client.on('voiceStateUpdate', oldState => {
            const { channel } = oldState

            if (channel && channel.name.startsWith(channelNameStart) && channel.members.size === 0) {
                channel.delete()
            }
        })
    }

    async run(message, args) {
        const [region, code] = args
        if(!region) {
            return message.reply(`Please specify a region.`)
        }
        if(!code) {
            return message.reply(`Please specify a code.`)
        }

        const { channel, guild, member} = message

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