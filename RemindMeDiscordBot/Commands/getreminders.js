module.exports = {
    name: 'getreminders',
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
        
        // make edge case for undefined
        console.log("Connected To Database!");
        var str = "SELECT * FROM single WHERE user_id = " + `${message.author.id}`;
        console.log(str);
        connection.query(str, function (error, results, fields) {
            if(error) {
                console.log(error);
                message.reply("Database error")
                return;
            }

            var outStr = "";
            results.forEach(function(item) {
                outStr += `At ${item.dateNtime}: ${item.message}\n`;
            });
            
            message.author.send(`${results.length} reminders for ${"<@" + message.author.id + ">"}`);
            const Discord = require('discord.js');
            const embeddedLayout = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setDescription(outStr)
            message.author.send(embeddedLayout);
        });
    }
}