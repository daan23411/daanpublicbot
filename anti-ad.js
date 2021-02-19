module.exports = (client) => {
    const isInvite = (guild, code) => {
        guild.fetchInvites().then((invites) => {
            console.log(invites)
        })

        client.on('message', message => {
            const { guild, member, content } = message

            if (content.includes('discord.gg/')) {
                isInvite(guild, '')
            }
        })
    }

}