module.exports = {
    permissions: [
        'ADMINISTRATOR'
    ],
    category: 'Setup',
    description: 'Simulate a join.',
    testOnly: true,
    callback: async({ message, args, text, client}) => {
        client.emit('guildMemberAdd', message.member)
    }
}