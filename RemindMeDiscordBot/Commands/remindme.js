const { datetime } = require("./HelpCommands/datetime.js");
const { datetype } = require("./HelpCommands/datetype.js");
const { formatting } = require("./HelpCommands/formatting.js");

module.exports = {
    name: 'remindme',
    description: 'Reminds the user of a given event at a given time',
    usage: '<Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder"> OR \n!remindme <Number greater than zero> <date type(minute, hour, day, week, month, year)> <"reminder">',
    args: true,
    execute: async(client, message, args, dbConn) => {        
        const mysql = require("mysql");

        // Splits the command from the reaction message. The reaction message is stored in msg[1]
        const msg = message.content.split("\"");

        /* 
        *  Splits the command info off from the command itself and stores it in reminder[1]
        *  Formatted like:
        *  reminder = {<commandname>, <date>, <time>, <empty string>}
        */

        const reminder = msg[0].split(" ");

        // Stores the date information into two corresponding variables.
        var datesplit = reminder[1];
        var timesplit = reminder[1];
        var val = 0;
        var timetype;
        console.log(msg);
        console.log(reminder);

        
        // Stores todays date information in corresponding variables
        const timeRegex = /^(([2]{1}[0-3]{1}:{1})|([0-1]?[0-9]{1}:{1}))([0-5]{1}[0-9]{1})$/
        const dateRegex = /^((1|01|3|03|5|05|7|07|8|08|10|12){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}[0-1]{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((4|04|6|06|9|09|11){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}0{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((2|02){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|)(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))$/
        const minRegex = /^(min|mins|m|minute|minutes)$/
        const hourRegex = /^(h|hour|hours)$/
        const dayRegex = /^(d|day|days)$/
        const weekRegex = /^(w|week|weeks)$/
        const monthRegex = /^(mo|month|months)$/
        const yearRegex = /^(y|year|years)$/
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        console.log(day);
        console.log(month);
        console.log(year);
        var timebool = 0;
        var datebool = 0;
        var valbool = 0;
        var both = 0;
        var choice = formatting(reminder);
        var statement;
        const Discord = require('discord.js');
        console.log(message.author);
        // Fancy stuff

        if(choice === 'time') {
            timesplit = reminder[1].split(":");
            statement = datetime(reminder[0], 0, timesplit, msg[1], message.author, 0, 0, 0);
            timebool = 1;
            console.log("Called time command!");
        }

        else if(choice === 'date') {
            datesplit = reminder[1].split("\/");
            statement = datetime(reminder[0], datesplit, 0, msg[1], message.author, 0, 0, 0);
            datebool = 1;
            console.log("Called date command!");
        }

        else if(choice === 'both') {
            datesplit = reminder[1].split("\/");
            timesplit = reminder[2].split(":");
            statement = datetime(reminder[0], datesplit, timesplit, msg[1], message.author, 0, 0, 0);
            both = 1;
            console.log("Called both command!");
        }

        else if(choice === 'val') {
            if(minRegex.test(reminder[2])) {
                timetype = "m";
            }
            else if(hourRegex.test(reminder[2])) {
                timetype = "h";
            }
            else if(dayRegex.test(reminder[2])) {
                timetype = "d";
            }
            else if(weekRegex.test(reminder[2])) {
                timetype = "w";
            }
            else if(monthRegex.test(reminder[2])) {
                timetype = "mo";
            }
            else if(yearRegex.test(reminder[2])) {
                timetype = "y";
            }
            console.log(timetype);
            statement = datetype(reminder[0], reminder[1], timetype, msg[1], message.author, 0, 0, 0);
            valbool = 1;
            console.log("Called val command!");
        }

        if(choice === 'valerr') {
            message.channel.send("Improper data given!");
            message.channel.send("Make sure that the data you entered is valid!");
            message.channel.send("For example \`!remindme 10 hours \"Homework due\"\` is valid but \`!remindme 10hours \"Homework due\"\` is not!");
        }
        else if(choice === 'timeerr') {
            message.channel.send("Improper Time given!");
            message.channel.send("Make sure that your time entered is after the current time if no date is given!");
            message.channel.send("For example the current time for me is:\`" + hour + ':' + String(minute).padStart(2, '0') + "\` is not valid by itself, but is valid if a date is given later than today's date.");
        }
        else if (choice === 'dateerr') {
            message.channel.send("Improper date given!");
            message.channel.send("Make sure that your date entered is after today's date if no time is given!");
            message.channel.send("For example today's date:\`" + month + '/' + day + '/' + year + "\` is not valid by itself, but is valid if a time is given later than the current time.");
        }
        else if(choice === 'botherr') {
            message.channel.send("Improper format!");
            message.channel.send("Make sure the time comes AFTER the date!");
        }
        const exampleEmbed = new Discord.RichEmbed()
        if(both == 1) {
            console.log("Adding both")
            console.log(timesplit);
            console.log(datesplit);
            exampleEmbed
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1])
                .addField("Date:", datesplit[0] + '/' + datesplit[1] + '/' + datesplit[2], true)
                .addField("Time:", timesplit[0] + ':' + String(timesplit[1]).padStart(2, '0'), true);
            message.channel.send(exampleEmbed);
            dbConn.query(statement, function (error) {
                if(error) {
                    console.log(error);
                    message.reply("Database error")
                    return;
                }
            })
        }
        else if(datebool == 1 || timebool == 1) {
            exampleEmbed
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1]);
            if(datebool == 1) {
                console.log("Adding date");
                exampleEmbed.addField("Date:", reminder[1], true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            if(timebool == 1) {
                console.log("Adding time");
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", reminder[1], true);
            }
            message.channel.send(exampleEmbed);
            dbConn.query(statement, function (error) {
                if(error) {
                    console.log(error);
                    message.reply("Database error")
                    return;
                }
            })
        }
        else if(valbool == 1) {
            console.log("Adding val");
            var nextday = new Date();
            exampleEmbed
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1]);
            if(timetype === "m") {
                nextday.setMinutes(minute + parseInt(reminder[1]))
                minute = nextday.getMinutes();
                hour = nextday.getHours();
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            else if(timetype === "h") {
                nextday.setHours(hour + parseInt(reminder[1]));
                hour = nextday.getHours();
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            else if(timetype === "d") {
                nextday.setDate(day + parseInt(reminder[1]));
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            else if(timetype === "w") {
                nextday.setDate(day + (parseInt(reminder[1]) * 7));
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            else if(timetype === "mo") {  
                nextday.setMonth(month - 1 + parseInt(reminder[1]));
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            else if(timetype === "y") {
                nextday.setFullYear(year + parseInt(reminder[1]));
                day = nextday.getDate();
                month = nextday.getMonth() + 1;
                year = nextday.getFullYear();
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            message.channel.send(exampleEmbed).then(async msg => {
                await msg.react('✅');
            });
            dbConn.query(statement, function (error) {
                if(error) {
                    console.log(error);
                    message.reply("Database error")
                    return;
                }
        })
        }
        
        // await promptMessage(exampleEmbed, message.author, 3600, '✅');

        // async function promptMessage(message, author, time, reaction) {
        //     time = time*1000;
        //     const filter = (reaction, user) => reaction.includes(reaction.emoji.name) && user.id != author.id;
        //     return message.awaitReactions(filter, {max: 10000, time: time}).then(collected => collected.first() && collected.first().emoji.name());
        // }
        // client.on('messageReactionAdd', (reaction, user) => {
        //     if(reaction.emoji.name === '✅') {
        //         if(choice === "time") {
        //             statement = datetime(reminder[0], 0, timesplit, msg[1], reaction.users, 0, 0, 0);
        //         }
        //         if(choice === "date") {
        //             statement = datetime(reminder[0], datesplit, 0, msg[1], reaction.users, 0, 0, 0);
        //         }
        //         if(choice === "both") {
        //             statement = datetime(reminder[0], datesplit, timesplit, msg[1], reaction.users, 0, 0, 0);
        //         }
        //         if(choice === "val") {
        //             statement = datetype(reminder[0], reminder[1], timetype, msg[1], reaction.users, 0, 0, 0);
        //         }
        //         dbConn.query(statement, function (error) {
        //             if(error) {
        //                 console.log(error);
        //                 message.reply("Database error")
        //                 return;
        //             }
        //         })
        //     }
        // })
    }
}