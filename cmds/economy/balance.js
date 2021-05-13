const economy = require('@features/economy')

module.exports = {
            name: 'balance',
            aliases: ['bal'],
            category: 'Economy',
            description: 'see someone\'s balance.',
            callback: async (message, args) => {
                const target = message.mentions.users.first() || message.author
                const targetId = target.id

                const guildId = message.guild.id
                const userId = target.id

                const coins = await economy.getCoins(guildId, userId)

                message.reply(`That user has ${coins} coins!`)
            }
}