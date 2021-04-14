const Commando = require('discord.js-commando')
const axios = require('axios')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'misc',
            memberName: 'cat',
            description: 'Show a random cat picture'
        })
    }

    async run(message, args) {
        axios
            .get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                message.channel.send(res.data[0].url)
            }).catch((err) => {
                console.log(err)
            })
    }
}