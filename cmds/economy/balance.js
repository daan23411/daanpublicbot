const economy = require('@features/economy')
const Commando = require('discord.js-commando')

module.exports = class BalanceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: ['bal'],
            group: 'economy',
            memberName: 'balance',
            description: 'see someone\'s balance.',
            argsType: 'single'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const coins = await economy.getCoins(guildId, userId)

        message.reply(`That user has ${coins} coins!`)
    }
}