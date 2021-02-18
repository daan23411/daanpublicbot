const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()
client.setMaxListeners(5000)

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const roleClaim = require('./role-claim')
const poll = require('./poll')
const welcome = require('./welcome')
const memberCount = require('./member-count')
const sendMessage = require('./send-message')
const mongo = require('./mongo')
const messageCount = require('./message-counter')
const mute = require('./mute')

client.on('ready', async () => {
    console.log('The client is ready!')
  
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

    command(client, 'ban', (message) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if( member.hasPermission("ADMINISTRATOR") || 
            member.hasPermission("BAN_MEMBERS") 
            ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`✅ - You succesfully banned ${tag}`)
            } else {
                message.channel.send(`❌ - You did not specify a user to ban ${tag}.`)
            }
        } else {
            return message.channel.send(`❌ - You do not have enough permissions to execute this command <@${member.id}>!`);
        }
    });

    command(client, 'kick', (message) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if( member.hasPermission("ADMINISTRATOR") || 
            member.hasPermission("KICK_MEMBERS") 
            ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`✅ - You succesfully been kicked ${tag}`)
            } else {
                message.channel.send(`❌ - You did not specify a user to kick ${tag}.`)
            }
        } else {
            return message.channel.send(`❌ - You do not have enough permissions to execute this command ${tag}!`);
        }
    });

    command(client, 'createtext', (message) => {
        const name = message.content.replace('!createtext', '')

        message.guild.channels.create(name, {
            type: 'text'
        }).then(channel => {
            const categoryId = '713368626190876714'
            channel.setParent(categoryId)
        })
    })

    command(client, 'createvoice', (message) => {
        const name = message.content.replace('!createvoice ', '')

        message.guild.channels.create(name, {
            type: 'voice'
        }).then(channel => {
            const categoryId = '713368626190876714'
            channel.setParent(categoryId)
            channel.setUserLimit(10)
        })
    })

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    })

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

        const { name, region, memberCount, owner, afkTimeout, createdAt, premiumTier, vanityURLCode, roles } = guild
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