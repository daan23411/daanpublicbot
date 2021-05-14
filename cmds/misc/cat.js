 
const axios = require('axios')

module.exports = {
    name: 'cat',
    category: 'Misc',
    description: 'Show a random cat picture',
    async callback(message, args) {
        axios
            .get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                message.channel.send(res.data[0].url)
            }).catch((err) => {
                console.log(err)
            })
    }
}