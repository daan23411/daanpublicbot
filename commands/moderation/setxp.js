const Levels = require('discord-xp')

module.exports = {
    name: 'setxp',
    category: 'Moderation',
    description: 'Set a user\'s xp.',
    minArgs: '2',
    maxArgs: '2',
    permissions: [
        "ADMINISTRATOR"
    ],
    expectedArgs: '<target mention> <amount of xp>',
    async callback({message, args}) {
       const target = message.mentions.users.first() || args[0]
       if(!target) {
           return message.reply(`It looks like you didn't specify a user or that user didn't exist.`)
       }

       const xp = args[1]
       if(!xp) {
           return message.reply(`It looks like you didn't specify an amount of xp.`)
       }

       try {
        Levels.setXp(target.id, message.guild.id, xp)
        .then(() => {
            message.reply(`Succesfully set the xp of **${target.tag}** to **${xp}**`)
        })
        .catch(err => {
            message.reply(`There was an invalid amount of xp provided. Please try again. Error Message: ${err}`)
        })
       } catch (err) {
           message.reply(`Something went wrong. Please send the following to the developer: ${err.message}`)
       }
    }
}
