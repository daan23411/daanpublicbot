require('module-alias/register')

// const discord = require('discord.js')
const cooldown = new Set()
const config = require('@root/config.json')  
// const client = new Client({
//     partials: ['MESSAGE', 'CHANNEL', 'REACTION']
// })
const path = require('path')
const Commando = require('discord.js-commando')
const client = new Commando.CommandoClient({
    owner: '501700626690998280',
    commandPrefix: config.prefix
})
client.setMaxListeners(5000)

const TicketData = require('@schemas/ticketData')
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
    // commandBase.loadPrefixes(client)
    client.registry
    .registerGroups([
        ['misc', 'Misc commands'],
        ['moderation', 'Moderation commands']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))
    
    loadLanguages(client)

    // loadCommands(client)
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

client.on('messageReactionAdd', async (reaction, client, message ) => {
    console.log(reaction)
    if (client.bot) return;

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(reaction.message.guild) return;

    const data = await TicketData.findOne({ GuildID: reaction.message.guild.id })
    if(!data) return;
    if(reaction.message.partial) await reaction.message.fetch()

    if(reaction.emoji.name === '🎫' && reaction.message.id === data.MessageID) {
        if(cooldown.has(message.member.id)) {
            reaction.message.memberd.remove(message.member.id)
            return
        }
        data.TicketNumber += 1;
        await data.save()
        const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().lenght)}${data.TicketNumber}`, {
            type: 'text',
            permissionOverwrites: [{
                id: reaction.message.member.id,
                deny: ['VIEW_CHANNEL'],
            },],
        });
        await channel.createOverwrite(message.member, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            SEND_TTS_MESSAGES: false
        });
        await channel.createOverwrite(date.whitelistedRole, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            SEND_TTS_MESSAGES: false
        });
        reaction.message.members.remove(message.member.id);
        const successEmbed = new discord.MessageEmbed()
        .setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().lenght)}${data.TicketNUmber}`)
        .setDescription(`This ticket was created by ${message.member.toString()}. Please explain your question so a staff member can help you faster. A staff member will be here shortly. If you are finished, please say \`done\`.`)
        .setColor('RANDOM')
        let succesMsg = await channel.send(`${message.member.toString()}`, successEmbed)
        await cooldown.add(message.member.id)
        await checkIfClose(client, reaction, message.member, successMsg, channel)
        setTimeout(function () {
            cooldown.delete(message.member.id)
        }, 30000);
    }
    async function checkIfClose(client, reaction, user, successMsg, channel) {
        const filter = m => m.content.toLowerCase() === 'done'
        const collector = new discord.MessageCollector(channel, filter)

        collector.on('collect', async msg => {
            channel.send(`This channel will be deleted in **10** seconds. Please type cancel to cancel this action`)
            if(m => m.content.toLowerCase() === 'cancel') {
                collector.stop()
                return message.channel.send('Okay. I canceled this action.')
            }
            await collector.stop()
            setTimeout(function () {
                channel.delete()
            }, 10000);
        })
    }
})

client.login(config.token)