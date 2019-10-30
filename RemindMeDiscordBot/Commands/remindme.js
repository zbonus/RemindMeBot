module.exports = {
    name: 'remindme',
    description: 'Reminds the user of a given event at a given time',
    usage: '!remindme <time (hh:mm) or date (mm/dd/yyyy)> <"reminder">',
    args: true,
    execute: async(client, message, args) => {        
    
        const msg = message.content.split(" ");
        const split = message.content.split("\"");
        const val = msg[1];

        console.log(val);

        var time = 0;
        var date = 0;

        var i = 0;
        for (i = 0; i < val.length; i++) {
            if (val.charAt(i) === ':') {
                time = 1;
                break;
            }
            if (val.charAt(i) === '/') {
                date = 1;
                break;
            }
        }

        if (time == 1) {
            //Call time
            //debug
            message.channel.send("Called time command!");
        }
        else if (date == 1) {
            //Call date
            //debug
            message.channel.send("Called date command!");
        }
        else {
            message.channel.send("Improper formatting");
            message.channel.send(`The proper usage would be: \`!remindme ${usage}\``);
        }

        const Discord = require('discord.js');

        const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(message.author + "'s reminder")
            .setDescription(split[1])
        message.channel.send(exampleEmbed);

    }
}