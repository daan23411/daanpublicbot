module.exports = {
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    callback: async({ message, args, text, client}) => {
        client.emit('guildMemberAdd', message.member)
    }
}