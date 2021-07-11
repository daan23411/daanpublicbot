const Levels = require('discord-xp')

module.exports = {
    name: 'rank',
    category: 'Info',
    description: 'Check yours or someone else\'s rank.',
    aliases: ['level'],
    async callback({ message, args }) {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.

        message.channel.send(`**${target.tag}** is currently level ${user.level} and is currently position ${user.position} on the leaderboard. XP: ${user.xp}/${Levels.xpFor(user.level + 1)}`); // We show the level.
    }
}