const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()
client.setMaxListeners(5000)

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./indexFiles/first-message')
const privateMessage = require('./indexFiles/private-message')
const roleClaim = require('./indexFiles/role-claim')
const poll = require('./indexFiles/poll')
const welcome = require('./indexFiles/welcome')
const memberCount = require('./indexFiles/member-count')
const sendMessage = require('./indexFiles/send-message')
const mongo = require('./mongo')
const messageCount = require('./indexFiles/message-counter')
const mute = require('./indexFiles/mute')
const antiAd = require('./indexFiles/anti-ad')
const inviteNotifications = require('./indexFiles/invite-notifications')

client.on('ready', async () => {
    console.log('The client is ready!')

    inviteNotifications(client)

    antiAd(client)
  
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          commandBase(client, option)
        }
      }
    }
  
    readCommands('commands')

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

    mute(client)

    messageCount(client)

    memberCount(client)

    welcome(client)

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

    command(client, 'help', message => {
        message.channel.send(`
            These are my supported commands:

        **!help** - Displays this message
        **!createtext** - Creates an text channel
        **!createvoice** - Creates a voice channel
        **!serverinfo** - Displays server information
        **!setstatus** - Sets the bots status
        **!cc** - Clears the messages send within 2 weeks
        **!clearchannel** - Alias to **!cc**
        **!ping** - Pong!
        **!servers** - Display the membercount of this server
        `)

        const { prefix } = config
        client.user.setPresence({
            activity: {
                name: `!help | ${client.user.username}`,
                type: 'PLAYING'
            },

        })

    })



});

client.login(config.token)