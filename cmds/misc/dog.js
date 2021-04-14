const Commando = require('discord.js-commando')
const axios = require('axios')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'misc',
            memberName: 'dog',
            description: 'Show a random dog picture'
        })
    }

    async run(message, args) {
        axios
            .get('https://api.thedogapi.com/v1/images/search')
            .then((res) => {
                message.channel.send(res.data[0].url)
            }).catch((err) => {
                console.log(err)
            })
    }
}