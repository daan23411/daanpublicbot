module.exports = {
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    category: 'Setup',
    description: 'Simulate a join.',
    callback: async({ message, args, text, client}) => {
        client.emit('guildMemberAdd', message.member)
    }
}