const Commando = require('discord.js-commando')
const amongUsSchema = require('@schemas/among-us-schema')

module.exports = class AmongUsCataCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setupau',
            aliases: ['sau', 'setupamongus', 'set-among-us'],
            group: 'setup',
            memberName: 'setupau',
            description: 'Setup the among us category.',
            userPermissions: ['ADMINISTRATOR'],
        })
    }

    async run(message, args) {
        const categoryId = args
        if(!categoryId) {
            return message.reply(`Please specify a category ID!`)
        }

        const guildId = message.guild.id

        await amongUsSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            categoryId: categoryId
        }, {
            upsert: true
        })

        message.reply('Among Us Category Set!')
    }
}