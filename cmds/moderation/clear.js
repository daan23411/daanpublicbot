const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'moderation',
            memberName: 'clear',
            description: 'clear a number of messages',
            argsType: 'multiple',
            userPermissions: [
                'MANAGE_MESSAGES'
            ]
        })
    }

    async run(message, args) {
        let amount = args[0]

        message.channel.bulkDelete(amount)
        message.channel.send(`I deleted ${amount} message(s) in this channel`)
    }
}