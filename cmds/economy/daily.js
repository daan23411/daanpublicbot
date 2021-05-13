
const economy = require('@features/economy')
const dailySchema = require('@schemas/daily-rewards')

let claimedCache = []

const clearCache = () => {
    claimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = {
    
            name: 'daily',
            category: 'Economy',
            description: 'Get your daily rewards',
            run: async (message, args) => {
        const { guild, member } = message
        const { id } = member

        if (claimedCache.includes(id)) {
            return message.reply(`You have already claimed your daily reward!`)
        }

        const obj = {
            guildId: guild.id,
            userId: id
        }

        const results = await dailySchema.findOne(obj)

        if(results) {
            const then = new Date(results.updatedAt).getTime()
            const now = new Date().getTime()

            const diffTime = Math.abs(now - then)
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

            if(diffDays <= 1) {
                claimedCache.push(id)
                
                return message.reply('You have already claimed your daily rewards!')
                
            }
        }

        await dailySchema.findOneAndUpdate(obj, obj, {
            upsert: true
        })

        claimedCache.push(id)

        const coins = 100
        // TODO: Give the rewards
        const newCoins = await economy.addCoins(guild.id, id, coins)
        message.reply(`You have claimed your daily rewards! you now have ${newCoins} coins`)
    }
}