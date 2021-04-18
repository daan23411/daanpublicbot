const Commando = require('discord.js-commando')
const { bugs } = require('@root/package.json')
const { MessageEmbed } = require('discord.js')

module.exports = class InviteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'info',
            memberName: 'invite',
            description: 'See my invite link.'
        })
    }

    async run(message, args) {
        let embed = new MessageEmbed()
       .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
       .setTitle('Invite Me')
       .setDescription(`Nice that you want to invite me to your server! \n\nLink: https://discord.com/api/oauth2/authorize?client_id=757520713790914560&permissions=8&scope=bot\n\nIf you find any bugs please report them on the github. \nLink: ${bugs.url}`)
       .setColor('#00ff00')
       .setFooter(`I am in ${this.client.guilds.cache.size} servers as of right now!`)
       .setThumbnail(this.client.user.displayAvatarURL())
       .setTimestamp()
       message.reply(embed)
    }
}