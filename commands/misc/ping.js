module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    description: 'Pong',
    callback: (message, arguments, text) => {
      message.reply('Pong!')
    },
  }