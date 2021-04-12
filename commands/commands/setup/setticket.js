const { MessageEmbed, MessageCollector } = require('discord.js')
const TicketData = require('@schemas/ticketData')

module.exports = {
    commands: 'setticket',
    description: "Setup the ticket system of the bot.",
    permissionError: 'You must be an admin to run this command.',
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments, text) => {
        let ticketData = await TicketData.findOne({ GuildID: message.guild.id });

        if (!ticketData) {
            const firstEmbed = new MessageEmbed()
                .setTitle('Ticket System Setup.')
                .setDescription('What description would you like the embed to have.')
                .setColor('#00ff00')
            let firstMsg = await message.channel.send(firstEmbed)

            const firstFilter = m => m.author.id === message.author.id
            const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 })

            let embedDescription;

            firstCollector.on('collect', async msg => {
                embedDescription = msg.content
                const secondEmbed = new MessageEmbed()
                    .setTitle('Ticket System Setup')
                    .setDescription('Where do you want to send the message? please mention a channel.') 
                    .setColor('#00ff00')    
                msg.channel.send(secondEmbed)
                firstCollector.stop()
                
                const secondFilter = m => m.author.id === message.author.id;
                const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 2 });

                secondCollector.on('collect', async msg => {
                    let embedChannel = msg.mentions.channels.first();
                    if (!embedChannel) {
                        msg.channel.send('That is not a valid channel! Please try again by re-using this command.');
                        secondCollector.stop()
                        return;
                    }

                    const thirdEmbed = new MessageEmbed()
                    .setTitle('Ticket System Setup')
                    .setDescription('What roles may have access to the tickets? Please provide a mention, id or name.') 
                    .setColor('#00ff00')
                    msg.channel.send(thirdEmbed)
                    secondCollector.stop()

                    const thirdFilter = m => m.author.id === message.author.id
                    const thirdCollector = new MessageCollector(message.channel, thirdFilter, { max: 2 })

                    thirdCollector.on('collect', async message => {
                        let savedRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase === message.content.toLowerCase())
                        if(!savedRole) {
                            msg.channel.send('That is not a valid role! Please try again by re-running this command.')
                            thirdCollector.stop()
                            return
                        }
                    
                        const fourthEmbed = new MessageEmbed()
                        .setTitle('Ticket System Setup')
                        .setDescription('The Setup is now finished!')
                        .setColor('#00ff00')
                        await msg.channel.send(fourthEmbed)
                        thirdCollector.stop()

                        await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole)
                    })
                })
            })

        } else {
            TicketData.findOneAndRemove({ GuildID: message.guild.id});
            message.channel.send(`**Successfully reset the ticket system on your server!**\nPlease run this command again to set it up again.`)   
        }
    },
}

async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole) {
    const sendEmbed = new MessageEmbed()
    .setTitle('Ticket')
    .setDescription(embedDescription)
    .setColor('RANDOM')

    let msg = await embedChannel.send(sendEmbed)
    await msg.react('🎫')

    const newData = new TicketData({
        GuildID: message.guild.id,
        MessageID: msg.id,
        TicketNumber: 0,
        whitelistedRole: savedRole.id
    })
    newData.save()
}