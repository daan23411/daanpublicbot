const Commando = require('discord.js-commando')
const axios = require('axios')

module.exports = class DocsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'docs',
            group: 'info',
            memberName: 'docs',
            description: 'Shows you the discord.js documentation.',
            argsType: 'multiple'
        })
    }

    async run(message, args) {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`
        if(!args) {
            return message.reply(`Please specify a documention to lookup`)
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