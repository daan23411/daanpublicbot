const axios = require('axios')
const { Client } = require("discord.js")

module.exports = {
    name: 'docs',
    category: 'Info',
    description: 'Shows you the discord.js documentation.',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<documentation you want to view>',
    callback: async({ message, channel, args }) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`
        if (!args) {
            
            message.reply(`Please specify a documention to lookup`)
            return
        }

        axios
            .get(uri)
            .then((embed) => {
                const { data } = embed

                if (data && !data.error) {
                    message.channel.send({ embed: data })
                } else {
                    return message.reply(`Couldn't find that documentation.`)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}