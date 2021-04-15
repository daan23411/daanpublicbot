const Commando = require('discord.js-commando')

const reasons = {
    SPAMMING: 5,
    ADVERTISING: 24,
    THREATS: -1,
    LIFETIME: -1
}

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            guildOnly: true,
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute a person with a specific reason',
            userPermissions: [
                'MANAGE_ROLES'
            ],
            argsType: 'multiple',
            format: '<Target @> <reason>'
        })
    }

    async run(message, args) {
        const { guild } = message

        if(args.length !== 2) {
            return message.reply(`Correct Syntax: ${guild.commandPrefix}mute <Target @> <Reason>`)
        }
    }
}