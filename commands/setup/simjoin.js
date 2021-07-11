module.exports = {
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    Category: 'Setup',
    Description: 'Simulate a join.',
    testOnly: true,
    callback: async({ message, args, text, client}) => {
        client.emit('guildMemberAdd', message.member)
    }
}