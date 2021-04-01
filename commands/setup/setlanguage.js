const mongo = require('../../mongo')
const languageSchema = require('../../schemas/language-schema')
const { languages } = require('../../lang.json')

module.exports = {
    commands: ['setlang', 'setlanguage'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<language>',
    permissions: 'ADMINISTRATOR',
    description: 'Displays the bot\'s latency and the discord API latency',
    callback: async (message, arguments) => {
      const { guild } = message

      const targetLanguage = arguments[0].toLowerCase()
      if(!languages.includes(targetLanguage)) {
          return message.reply(`The language you chose (${targetLanguage}) is currently not supported.`)
      }

      await languageSchema.findOneAndUpdate({
          _id: guild.id
      }, {
          _id: guild.id,
          language: targetLanguage
      }, {
          upsert: true
      })

      message.reply(`The language has been set to ${targetLanguage}`).then((message) => {
        const seconds = 5
        message.delete({
              timeout: 1000 * seconds
          })
      })
    },
  }