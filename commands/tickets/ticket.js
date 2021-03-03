const ticketFile = require('../../indexFiles/ticket-file')
const check = '✅'

module.exports = {
    commands: ['ticket', 'new'],
    expectedArgs: '<message>',
    minArgs: 1,
    callback: (client) => {
      ticketFile(client)
    },
  }