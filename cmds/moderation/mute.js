const Commando = require('discord.js-commando')
const muteSchema = require('@schemas/mute-schema')

const reasons = {
    SPAMMING: 5,
    ADVERTISING: 24
}

module.exports = class MuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            guildOnly: true,
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute a person with a specific reason',
            userPermissions: [
                'MANAGE_ROLES'
            ],
            clientPermissions: [
                "MANAGE_ROLES"    
            ],
            argsType: 'multiple',
            format: '<Target @> <reason>'
        })
    }

    async run(message, args) {
        const { guild, author: staff } = message

        if(args.length !== 2) {
            return message.reply(`Correct Syntax: ${guild.commandPrefix}mute <Target @> <Reason>`)
        }

        const target = message.mentions.users.first()
        if(!target) {
            return message.reply(`Please specify a user to mute. I can't mute thin air.`)
        }

        const reason = args[1].toUpperCase()
        if(!reasons[reason]) {
            let validReasons = ''
            for (const key in reasons) {
                validReasons += `${key}, `
            }
            validReasons = validReasons.substr(0, validReasons.length - 2)

            return message.reply(`That is a great reason but I don't understand. Please use one of the following reasons: ${validReasons}`)
        }

        const previousMutes = await muteSchema.find({
            userId: target.id,
            guildId: guild.id
        })

        const currentlyMuted = previousMutes.filter(mute => {
            return mute.current === true
        })

        if(currentlyMuted.length) {
            return message.reply(`I can't mute <@${target.id}> because he is already muted.`)
        }

        let duration = reasons[reason] * (previousMutes.length + 1)
        const expires = new Date()
        expires.setHours(expires.getHours() + duration)

        const mutedRole = guild.roles.cache.find(role => {
            return role.name === 'Muted'
        })

        if (!mutedRole) {
            guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#616263',
                    permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                },
                reason: 'No muted role existed so I created one'
            }).catch((err) => {
                console.log(err)
            }) 
            return message.reply("I couldn't mute that person since I can't find a role called 'Muted'. That might be useful so I created one")
        }

        const targetMember = (await guild.members.fetch()).get(target.id)
        targetMember.roles.add(mutedRole).catch(console.error)

        await new muteSchema({
            userId: target.id,
            guildId: guild.id,
            reason,
            staffId: staff.id,
            staffTag: staff.tag,
            expires,
            current: true
        }).save()

        message.reply(`You muted <@${target.id}> for "${reason}". They will be unmuted in ${duration} hours`)
    }
}