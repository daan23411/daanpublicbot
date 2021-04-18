const muteSchema = require('@schemas/mute-schema')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        const {guild, id} = member

        const currentMute = await muteSchema.findOne({
            userId: id,
            guildId: guild.id,
            current: true
        })

        if(currentMute) {
            const role = guild.roles.cache.find(role => {
                return role.name === "Muted"
            })

            if(role) {
                member.roles.add(role)
            }
        }

        
    })
}