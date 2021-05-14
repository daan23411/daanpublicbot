 
const axios = require('axios')

module.exports = {
    name: 'dog',
    category: 'Misc',
    description: 'Show a random dog picture',
    async callback(message, args) {
        axios
            .get('https://api.thedogapi.com/v1/images/search')
            .then((res) => {
                message.channel.send(res.data[0].url)
            }).catch((err) => {
                console.log(err)
            })
    }
}