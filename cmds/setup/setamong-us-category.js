 
const amongUsSchema = require('@schemas/among-us-schema')

module.exports = {
    name: 'setupau',
    aliases: ['sau', 'setupamongus', 'set-among-us'],
    category: 'Setup',
    description: 'Setup the among us category.',
    permissions: ['ADMINISTRATOR'],
    async callback(message, args) {
        const categoryId = args
        if (!categoryId) {
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