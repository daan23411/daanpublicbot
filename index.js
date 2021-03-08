const Discord = require('discord.js')
const client = new Discord.Client()
client.setMaxListeners(5000)

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./indexFiles/first-message')
const privateMessage = require('./indexFiles/private-message')
const roleClaim = require('./indexFiles/role-claim')
const poll = require('./indexFiles/poll')
const memberCount = require('./indexFiles/member-count')
const sendMessage = require('./indexFiles/send-message')
const mongo = require('./mongo')
const messageCount = require('./indexFiles/message-counter')
const mute = require('./indexFiles/mute')
const antiAd = require('./indexFiles/anti-ad')
const inviteNotifications = require('./indexFiles/invite-notifications')
const welcome = require('./indexFiles/welcome')
const loadCommands = require('./commands/load-commands')
const levels = require('./indexFiles/levels')

client.on('ready', async () => {
    console.log('The client is ready!')

    loadCommands(client)

    levels(client)

    inviteNotifications(client)

    welcome(client)

    antiAd(client)

    await mongo().then(mongoose => {
        try {
            console.log('Conntected to MongoDB!')
        } finally {
            mongoose.connection.close()
        }
    })

    const guild = client.guilds.cache.get('713368626190876712')
    const channel = guild.channels.cache.get('713368626190876716')

    // sendMessage(channel, 'hello world', 3)

   // mute(client)

    messageCount(client)

    memberCount(client)

    roleClaim(client)

    poll(client)

   // firstMessage(client, '805216410703364107', 'hello world!!!', ['🔥', '🍉'])

    privateMessage(client, 'ping', 'Pong!')

    privateMessage(client, 'help', 'DM a staff member to get help.')

    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'setstatus', (message) => {
        const content = message.content.replace('!setstatus ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })

    command(client, 'serverinfo', message => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout, createdAt, premiumTier, vanityURLCode } = guild
        const icon = guild.iconURL()

        let embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region
                },
                {
                    name: 'Members',
                    value: memberCount
                },
                {
                    name: 'Owner',
                    value: owner.user.tag
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60
                }, 
                {
                    name: 'Boost Tier',
                    value: premiumTier
                },
                {
                    name: 'Created At',
                    value: createdAt
                },
                {
                    name: 'Vanity URL:',
                    value: vanityURLCode
                                       
                })
            .setColor('RANDOM')
            .setTimestamp();


        message.channel.send(embed)
    })
});

client.login(config.token)