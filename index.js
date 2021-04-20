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

const TicketData = require('@schemas/ticketData')
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

client.on('ready', async () => {
    client.user.setPresence({ activity: { name: 'DO NOT USE! CURRENTLY UPDATING!'},  status: 'online'})

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

client.on('messageReactionAdd', async (reaction, client, message) => {
    console.log(reaction)
    if (client.bot) return;

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.message.guild) return;

    const data = await TicketData.findOne({ GuildID: reaction.message.guild.id })
    if (!data) return;
    if (reaction.message.partial) await reaction.message.fetch()

    if (reaction.emoji.name === '🎫' && reaction.message.id === data.MessageID) {
        if (cooldown.has(message.member.id)) {
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
            if (m => m.content.toLowerCase() === 'cancel') {
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