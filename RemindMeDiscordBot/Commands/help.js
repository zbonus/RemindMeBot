module.exports = {
    name: 'help',
    description: 'Displays information for every possible command',
    args: false,
    execute(client, message, args) {
        message.channel.send("It looks like you're having problems using the bot. Would you like some help?\n");
        const fs = require('fs');

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var outStr = "To learn more about each command, type !info <commandName>\n\n";
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            outStr += `\`${command.name}: ${command.description}\`\n`;
            outStr += `\`!${command.name}${command.args ? ' ' + command.usage : ''}\`\n\n`;
        }

        const Discord = require('discord.js');
        const embeddedLayout = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription(`${outStr}`)
        message.channel.send(embeddedLayout);
    }
}