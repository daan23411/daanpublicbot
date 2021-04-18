const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: "ipc"
})

rpc.on("ready", () => {
    rpc.setActivity({
        details: "DOUBT DISCORD BOT",
        state: 'Best All-Round discord bot of this year!',
        startTimestamp: new Date(),
        largeImageKey: "doubt",
        largeImageText: "Invite Him now!",
        buttons: [
            {label: "Invite Him!", url: "https://discord.com/api/oauth2/authorize?client_id=757520713790914560&permissions=8&scope=bot"},
            {label: "Support Server (Comming Soon)", url: "https://discord.com/api/oauth2/authorize?client_id=757520713790914560&permissions=8&scope=bot"}
        ]
    })
    console.log('Discord RPC has been enabled!')
})

rpc.login({
    clientId: '757520713790914560'
})