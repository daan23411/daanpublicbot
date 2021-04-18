const economy = require('@features/economy')
const Commando = require('discord.js-commando')

module.exports = class PayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            group: 'economy',
            memberName: 'pay',
            description: 'pay someone a specific amount of coins.',
            argsType: 'multiple'
        })
    }

    async run(message, args) {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to give coins to.')
            return
        }

        const coinsToGive = args[1]
        if (isNaN(coinsToGive)) {
            message.reply('Please provide a valid number of coins to give.')
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinsToGive) {
            message.reply(`You do not have ${coinsToGive} coins!`)
            return
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
        )
        const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)

        message.reply(
            `You have given <@${target.id}> ${coinsToGive} coins! They now have ${newBalance} coins and you have ${remainingCoins} coins!`
        )
    }
}