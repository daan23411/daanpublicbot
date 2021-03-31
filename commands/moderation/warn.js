module.exports = {
    commands: 'warn',
    minArgs: '2',
    expectedArgs: '<Mention> <reason>',
    callback: (message, arguments) => {
        const target = message.mentions.user.first()
        if(!target) { 
            return message.reply('Please specify someone to warn')
        }

        arguments.shift()

        const guildId = message.guild.id
        const userId = message.member.id
        const reason = arguments.join(' ')

        console.log(guiildId, userId, reason)
    }
}