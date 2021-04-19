const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'hello',
            group: 'misc',
            memberName: 'hello',
            description: 'Adds two numbers together',
            argsType: 'multiple'
        })
    }

    async run(message, args) {
       message.reply('Hello!')
    }
}