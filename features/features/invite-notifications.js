const inviteNoti = require('@schemas/invitenoti-schema')

module.exports = client => {
    const invites = {}

    const getInvitesCount = async (guild) => {
        return await new Promise(resolve => {
            guild.fetchInvites().then((invites) => {
                const inviteCounter = {}

                invites.forEach(invite => {
                    const { uses, inviter } = invite
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
        const cache = {}
        const { guild } = member
    
        const invitesBefore = invites[guild.id]
        const invitesAfter = await getInvitesCount(guild)
    
        for (const inviter in invitesAfter) {
            if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
                const { guild } = member
    
        let data = cache[guild.id]
    
        if (!data) {
            console.log('FETCHING FROM DATABASE')
    
            
                try {
                    const result = await inviteNoti.findOne({ _id: guild.id })
    
                    cache[guild.id] = data = [result.channelId, result.text]
                } catch (err) {
                    console.log(err)
                  }
        }
    
        const channelId = data[0]
        const text = data[1]
        const count = invitesAfter[inviter]
    
        const channel = guild.channels.cache.get(channelId)
        channel.send(text.replace(/<@>/g, `<@${member.id}>`) + ` Invited By: **${inviter}**. They now have **${count}** invites`)
            }
        }
    })
}