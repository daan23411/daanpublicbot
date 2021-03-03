const inviteNoti = require('../schemas/invitenoti-schema')

module.exports = client => {
    const invites = {}

    const getInvitesCount = async (guild) => {
        return await new Promise(resolve => {
            guild.fetchInvites().then((invites) => {
                const inviteCounter = {}

                invites.forEach(invite => {
                    const { uses, inviter} = invite
                    const { username, discriminator } = inviter

                    const name = `${username}#${discriminator}`

                    inviteCounter[name] = (inviteCounter[name] || 0) + uses
                });

                resolve(inviteCounter)
            })
        })
    }

    client.guilds.cache.forEach(async guild => {
        invites[guild.id] = await getInvitesCount(guild)
    })

    client.on('guildMemberAdd', async member => {
        const { guild } = member

        const inviteBefore = invites[guild.id]
        const inviteAfter = await getInvitesCount(guild)
    })
}