const Discord = require('discord.js')
const client = new Discord.Client()
client.setMaxListeners(5000)

const config = require('./config.json')
const command = require('./command')
const poll = require('./indexFiles/poll')
const memberCount = require('./indexFiles/member-count')
const mongo = require('./mongo')
const messageCount = require('./indexFiles/message-counter')
const antiAd = require('./indexFiles/anti-ad')
const inviteNotifications = require('./indexFiles/invite-notifications')
const loadCommands = require('./commands/load-commands')
const levels = require('./indexFiles/levels')
const commandBase = require('./commands/command-base')


client.on('ready', async () => {
    commandBase.loadPrefixes(client)

    loadCommands(client)

    levels(client)

    inviteNotifications(client)

    antiAd(client)

    await mongo(client)

    messageCount(client)

    memberCount(client)

    poll(client)


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
    console.log('The client is ready!')
});

client.login(config.token)