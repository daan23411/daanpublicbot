require('module-alias/register')

const discord = require('discord.js')
const WOKCommands = require('wokcommands')
const config = require('@root/config.json')
const client = new discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
client.setMaxListeners(5000)

client.on('guildCreate', guild => {
    let embed = new discord.MessageEmbed()
        .setTitle('Thanks for inviting me!')
        .setDescription(`Here is some information about me. Please run !help to get all available commands. \n\nMy owner is daan2341#8196. \nI am Doubt and I will be assisting you in this guild. \nIf you find any bugs please report them at "https://github.com/daan23411/doubt-discord-bot/issues". \nIf you have any suggestions for features, mute reasons or anything else please also put them on the github. \nBefore I forget. You can change my prefix with the !prefix command :)`)
        .setColor('RANDOM')
        .setTimestamp()


    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    channel.send(embed)
})

client.on('ready', async (guild) => {
    new WOKCommands(client, {
        commandDir: 'commands',

        featuresDir: 'features',

        showWarns: true,

        del: 10,

        ignoreBots: true,

        dbOptions: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },

        testServers: ['713368626190876712', '833675115408523264'],
    })
        .setDefaultPrefix('!')
        .setColor('00ff00')
        .setMongoPath(config.MongoPath)
        .setCategorySettings([
            {
                name: 'Economy',
                emoji: '💸'
            },
            {
                name: 'Development',
                emoji: '🔨',
                hidden: true,
            },
            {
                name: 'Info',
                emoji: '🌐'
            },
            {
                name: 'Setup',
                emoji: '⚙',
                hidden: true,
            },
            {
                name: 'Games',
                emoji: '🎮'
            },
            {
                name: 'Misc',
                emoji: '✨'
            },
            {
                name: 'Moderation',
                emoji: '🔒'
            },
            {
                name: 'Roles',
                emoji: '🎞'
            },
            {
                name: 'Reaction Roles',
                emoji: '🎗',
                hidden: true
            }
        ])

    client.user.setPresence({ activity: { name: `${config.prefix}help`, type: 'LISTENING' }, status: 'online' })

    console.log('The client is ready!')
});

client.login(config.token)