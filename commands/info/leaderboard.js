const Levels = require('discord-xp')

module.exports = {
    name: 'leaderboard',
    category: 'Info',
    description: 'Check the servers leaderboard.',
    aliases: ['lb'],
    async callback({ message, client }) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    }
}