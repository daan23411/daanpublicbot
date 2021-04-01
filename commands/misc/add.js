const language = require('../../indexFiles/language')

module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    description: 'Add 2 numbers together',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
      const { guild } = message
      
      const num1 = +arguments[0]
      const num2 = +arguments[1]
  
      message.reply(`${language(guild, 'THE_SUM_IS')} ${num1 + num2}`)
    },
  }