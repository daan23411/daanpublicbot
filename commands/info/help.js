const loadCommands = require('../load-commands')
const { newPrefix } = require('../command-base')

module.exports = {
  commands: ['help'],
  description: "Describes all of this bot's commands",
  callback: (message, arguments, text, client) => {
    let reply = `I am ${client.user.username}, here are my supported commands:\n\n`

    const commands = loadCommands()

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
      const { description } = command

      reply += `**${newPrefix}${mainCommand}${args}** = ${description}\n`
    }

    message.channel.send(reply)
  },
}