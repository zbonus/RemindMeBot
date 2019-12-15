const choices = [ "◀️", "▶️", "❌"];
const choices1 = [ "▶️", "❌"];
const choices2 = [ "◀️", "❌"];

module.exports = {
    name: 'help',
    description: 'Displays information for every possible command',
    args: false,
    execute(client, message, args) {
        message.channel.send("It looks like you're having problems using the bot. Would you like some help?\n");
        const fs = require('fs');

        // get info for displaying commands
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var numPages = Math.ceil(commandFiles.length/5);
        var pagenum = 0;
        var outStr = "";
        helpMenu();

        // this function calls the other functions and allows the menu to be shown repeatedly without using the !help command multiple times
        async function helpMenu()
        {
            const msg = await display(message, pagenum * 5);
            const reacted = await waitForReaction( message.author, choices, choices1, choices2, 30, msg);
            await msg.clearReactions();
            msg.delete();
            getReaction(reacted, msg);
        }

        // show up to 5 commands then wait for and return the users reaction
        async function display(message, commandNum)
        {
            a = commandNum;
            b = commandNum + 5;
            outStr = `To learn more about each command, type !info <commandName> showing page ${pagenum + 1} of ${numPages}\n\n`;
            for (a; a < b && a < commandFiles.length; a++)
            {
                const command = require(`./${commandFiles[a]}`);
                outStr += `\`${command.name}: ${command.description}\`\n`;
                outStr += `\`!${command.name}${command.args ? ' ' + command.usage : ''}\`\n\n`;
    
            }
            const Discord = require('discord.js');
            const embeddedLayout = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Help')
                .setDescription(`${outStr}`)
            return msg = await message.channel.send(embeddedLayout);

        }

        async function waitForReaction( author, reactions, reactions1, reactions2, time, msg)
        {
            time *= 1000;
            if (pagenum == 0)
            {
                for(const reaction of reactions1) await msg.react(reaction);
                const filter = (reaction, user) => reactions1.includes(reaction.emoji.name) && user.id === author.id;
                return msg.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
            }
            else if ((pagenum + 1) >= numPages)
            {
                for(const reaction of reactions2) await msg.react(reaction);
                const filter = (reaction, user) => reactions2.includes(reaction.emoji.name) && user.id === author.id;
                return msg.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
            }
            else
            {
                for(const reaction of reactions) await msg.react(reaction);
                const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
                return msg.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
            }
        }

        // do stuff based on reaction
        function getReaction(reacted)
        {
            if (reacted == "◀️")
            {
                // previous page button pressed
                if (!(pagenum == 0))
                {

                    pagenum -= 1;
                    helpMenu();
                }
                else
                {
                    // no previous page
                    console.log("no previous page");
                }
            }
            else if (reacted == "▶️")
            {
                // next page button pressed
                if ((pagenum + 1) >= numPages)
                {
                    // no next page
                    console.log("no next page");
                }
                else
                {
                    pagenum += 1;
                    helpMenu();                
                }
            }
            else if (reacted == "❌")
            {
                // exit button pressed (delete message)
                console.log("exit button pressed");
            }
            else
            {
                // emoji not recognized
                console.log("emoji not recognized, or reaction timed out");
            }
        }
    }
}