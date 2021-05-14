 

module.exports = {

    name: 'clear',
    category: 'Moderation',
    description: 'clear a number of messages',
    argsType: 'multiple',
    permissions: [
        "MANAGE_MESSAGES"
    ],
    async callback(message, args) {
        let amount = args[0]

        message.channel.bulkDelete(amount)
        message.channel.send(`I deleted ${amount} message(s) in this channel`)






    }
}
