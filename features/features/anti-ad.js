module.exports = (client) => {
    const isInvite = async (guild, code) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true)
              return
            }
          }
  
          resolve(false)
        })
      })
    }
  
    client.on('message', async (message) => {
      const { guild, member, content } = message
  
      // discord.gg/23RAN4
  
      const code = content.split('https://discord.gg/PDuWVr8uZh')[1]
  
      if (content.includes('discord.gg/')) {
        const isOurInvite = await isInvite(guild, code)
        if (!isOurInvite) {
         try {
           content.delete()
            member.send(`You have been banned from **${guild.name}** for advertising.`)
          await member.ban('Advertising in our server.')
         } catch (err) {
             console.log(err)
         }
        }
      }
    })
  }