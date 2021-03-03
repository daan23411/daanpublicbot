module.exports = {
    commands: 'invites',
    callback: (message) => {
      const { guild } = message
  
      guild.fetchInvites().then((invites) => {
        const inviteCounter = {}
  
        invites.forEach((invite) => {
          const { uses, inviter } = invite
          const { username, discriminator } = inviter
  
          const name = `${username}#${discriminator}`
  
          inviteCounter[name] = (inviteCounter[name] || 0) + uses
        })
  
        let replyText = 'Invites:'
  
        const sortedInvites = Object.keys(inviteCounter).sort(
          (a, b) => inviteCounter[b] - inviteCounter[a]
        )
  
        sortedInvites.length = 3
  
        for (const invite of sortedInvites) {
          const count = inviteCounter[invite]
          replyText += `\n${invite} has invited ${count} member(s)!`
        }
  
        message.reply(replyText + `\n**NOTE:** If you have less then 3 invites it is going to say undefined. Do not be botherd with this. Do not report this as this ain't an issue`)
      })
    },
  }