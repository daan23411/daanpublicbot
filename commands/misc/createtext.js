module.exports = {
    commands: ['createtxt', 'createtext', 'ct'],
    expectedArgs: '<name>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const name = message.content.replace('!createtext', '')

        message.guild.channels.create(name, {
            type: 'text'
        }).then(channel => {
            const categoryId = '713368626190876714'
            channel.setParent(categoryId)
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }