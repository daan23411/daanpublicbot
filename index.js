require('module-alias/register')


const discord = require('discord.js')
const cooldown = new Set()
const config = require('@root/config.json')
// const client = new Client({
//     partials: ['MESSAGE', 'CHANNEL', 'REACTION']
// })
const { MongoClient } = require('mongodb')
const { MongoDBProvider } = require('commando-provider-mongo')
const path = require('path')
const Commando = require('discord.js-commando')
const client = new Commando.CommandoClient({
    owner: '501700626690998280',
    commandPrefix: config.prefix,
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})
client.setProvider(
    MongoClient.connect(config.MongoPath, {
        useUnifiedTopology: true
    }).then((client) => {
        return new MongoDBProvider(client, 'Data')
    })
)
client.setMaxListeners(5000)

const poll = require('@features/poll')
const mongo = require('@util/mongo')
const messageCount = require('@features/message-counter')
const antiAd = require('@features/anti-ad')
const inviteNotifications = require('@features/invite-notifications')
const levels = require('@features/levels')
const loadFeatures = require('@root/features/load-features')
const mute = require('@features/moderation/mute')

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

    client.user.setPresence({ activity: { name: `${config.prefix}help`, type: 'LISTENING'},  status: 'online'})

    client.registry
        .registerGroups([
            ['misc', 'Misc commands'],
            ['moderation', 'Moderation commands'],
            ['economy', 'Economy commands'],
            ['info', 'Info commands'],
            ['roles', 'Roles commands'],
            ['setup', 'Setup commands'],
            ['games', 'Games commands']
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'cmds'))

    mute(client)
    
    loadFeatures(client)

    levels(client)

    inviteNotifications(client)

    antiAd(client)

    await mongo(client)

    messageCount(client)

    poll(client)

    console.log('The client is ready!')
});

client.login(config.token)