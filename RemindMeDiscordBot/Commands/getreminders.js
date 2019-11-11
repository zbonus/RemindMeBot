module.exports = {
    name: 'getreminders',
    description: 'Get your active reminders private messaged to yourself',
    args: false,
    execute(client, message, args) {
        const mysql = require("mysql");

        var connection = mysql.createConnection({
            host: "classdb.it.mtu.edu",
            user: "teamclippy_rw",
            password: "tClippy!",
            database: "teamclippy",
            port: 3307
        });

        connection.connect(err => {
            if(err) throw err;
        });
        
        var str = "SELECT * FROM single WHERE user_id = " + `${message.author.id}`;
        connection.query(str, function (error, results, fields) {
            if(error) {
                console.log(error);
                message.reply("Database error")
                return;
            }

            var outStr = "";
            results.forEach(function(item) {
                outStr += `At ${item.dateNtime}: ${item.message}\nID: ${item.react_id} Table: single\n`;
            });
            
            message.channel.send(`Message sent to <@${message.author.id}>`);
            message.author.send(`You have ${results.length} reminders`);
            if (results.length != 0) {
                const Discord = require('discord.js');
                const embeddedLayout = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setDescription(outStr)
                message.author.send(embeddedLayout);
            }
        });
    }
}