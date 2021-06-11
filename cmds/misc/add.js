module.exports = {
    name: 'add',
    category: 'Misc',
    description: 'Adds two numbers together',
    minArgs: 2,
    maxArgs: 2,
    async callback({message, args}) {
        let sum = 0

        for (const arg of args) {
            sum += parseInt(arg)
        }

        message.reply(`The sum is ${sum}`)
    }
}