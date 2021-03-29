const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

module.exports = (client) => {

if (message.author === client) {
 return
}

    client.on('message', message => {
        const { guild, member } = message

        addXP(guild.id, member.id, 23, message)
    })
}

const getNeededXP = level => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
    await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true
            })

            let { xp, level } = result
            const needed = getNeededXP(level)

            if (xp >= needed) {
                ++level
                xp -= needed

                message.reply(`GG! You have leveled up to ${level}. You now have ${xp} experience for next level. You need ${getNeededXP(level)} xp to level up to the next level`)

                await profileSchema.updateOne({
                    guildId,
                    userId
                }, {
                    level,
                    xp
                })
            }
        } finally {
            mongoose.connection.close
        }


    })
}

module.exports.addXP = addXP
