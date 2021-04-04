require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
client.setMaxListeners(5000)

const config = require('@root/config.json')
const command = require('@util/command')
const poll = require('@features/poll')
const memberCount = require('@features/member-count')
const mongo = require('@util/mongo')
const messageCount = require('@features/message-counter')
const antiAd = require('@features/anti-ad')
const inviteNotifications = require('@features/invite-notifications')
const loadCommands = require('@root/commands/load-commands')
const levels = require('@features/levels')
const commandBase = require('@root/commands/command-base')
const { loadLanguages } = require('@util/language')
const loadFeatures = require('@root/features/load-features')

client.on('ready', async () => {
    commandBase.loadPrefixes(client)

    loadLanguages(client)

    loadCommands(client)
    loadFeatures(client)

    levels(client)

    inviteNotifications(client)

    antiAd(client)

    await mongo(client)

    messageCount(client)

    memberCount(client)

    poll(client)
    
    console.log('The client is ready!')
});

client.login(config.token)