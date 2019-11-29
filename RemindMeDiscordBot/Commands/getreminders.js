module.exports = {
    name: 'getreminders',
    description: 'Get your active reminders private messaged to yourself',
    args: false,
    execute(client, message, args, connection) {
        var str = "SELECT * FROM single WHERE user_id = " + `${message.author.id}`;
        var str2 = "SELECT * FROM multiple WHERE user_id = " + `${message.author.id}`;
        var single_res = 0;
        var mul_res = 0;
        var outStr = "";
        connection.query(str, function (error, results, fields) {
            if(error) {
                message.reply("A database error has occurred. Please report the problem to the developers and what you did that caused this error.\n" + 
                `Error: ${error.name}\n`);
                console.error("", error);
                console.log("A database error has occured. See details above.");
                return;
            }
            single_res = results.length;
            results.forEach(function(item) {
                var dNt = item.dateNtime.toString();
                var date = dNt.substring(0, 16);
                var time = dNt.substring(16, dNt.length);
                outStr += `ID: ${item.react_id}, Table: single, On ${date} at ${time}: ${item.message}\n`;
            });
        });
        connection.query(str2, function (error, results, fields) {
            if(error) {
                message.reply("A database error has occurred. Please report the problem to the developers and what you did that caused this error.\n" + 
                `Error: ${error.name}\n`);
                console.error("", error);
                console.log("A database error has occured. See details above.");
                return;
            }
            mul_res = results.length;
            results.forEach(function(item) {
                var dNt = item.dateNtime.toString();
                var server = item.server_id.toString();
                var date = dNt.substring(0, 16);
                var time = dNt.substring(16, dNt.length);
                outStr += `ID: ${item.react_id}, Table: multiple, On ${date} at ${time}: ${item.message} in server: \n`;
            });
            message.channel.send(`Message sent to <@${message.author.id}>`);
            message.author.send('You have ' + single_res + ' self reminders and ' + mul_res + ' group reminders!');
            if (single_res != 0 || mul_res != 0) {
                const Discord = require('discord.js');
                const embeddedLayout = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setDescription(outStr);
                    message.author.send(embeddedLayout);
            }
            console.log(outStr);

        });

    }
}