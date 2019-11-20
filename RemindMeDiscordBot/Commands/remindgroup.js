const datetime = require("./HelpCommands/datetime.js");
const datetype = require("./HelpCommands/datetype.js");
module.exports = {
    name: 'remindgroup',
    description: 'Reminds a group of people in a discord server of a specific event',
    usage: '<Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder"> <#Channel> <@Role> OR \n!remindgroup <Number greater than zero> <date type(minute, hour, day, week, month, year)> <"reminder"> <#Channel> <@Role>',
    args: true,
    execute: async(client, message, args, dbConn) => {
        const mysql = require('mysql');

        // Splits the command from the reaction message. The reaction message is stored in msg[1]
        const msg = message.content.split("\"");

        /* 
        *  Splits the command info off from the command itself and stores it in reminder[1]
        *  Formatted like:
        *  reminder = {<commandname>, <date>, <time>, <#Channel>, <@Role>, <empty string>}
        */

        const reminder = msg[0].split(" ");
        const channels = msg[2].split(" ");
        // Stores data in corresponding variables
        var datesplit = reminder[1];
        var timesplit = reminder[1];
        var channel = channels[1];
        var role = channels[2];
        var val = 0;
        var timetype;
        console.log(msg);
        console.log(reminder);
        console.log(channels);
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
        if(channels.charAt(1) != '#') {
            choice = 'cherr';
        }
        if(role.charAt(1) != '@') {
            choice = 'roleerr'
        }
        else if(role.charAt(2) != '&') {
            choice = 'roleerr';
        }
        if(choice === 'time') {
            timesplit = reminder[1].split(":");
            statement = datetime(reminder[0], 0, timesplit, msg[1], message.author);
            timebool = 1;
            console.log("Called time command!");
        }

        else if(choice === 'date') {
            datesplit = reminder[1].split("\/");
            statement = datetime(reminder[0], datesplit, 0, msg[1], message.author);
            datebool = 1;
            console.log("Called date command!");
        }

        else if(choice === 'both') {
            datesplit = reminder[1].split("\/");
            timesplit = reminder[2].split(":");
            statement = datetime(reminder[0], datesplit, timesplit, msg[1], message.author);
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
            statement = datetype(reminder[0], reminder[1], timetype, msg[1], message.author);
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
            message.channel.send("For example the current time for me is:\`" + hour + ':' + minute + "\` is not valid by itself, but is valid if a date is given later than today's date.");
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
        else if(choice === 'cherr') {
            message.channel.send("Improper channel given!");
            message.channel.send("Make sure the channel actually exists in this Discord server!");
        }
        else if(choice === 'roleerr') {
            message.channel.send("Improper role given!");
            message.channel.send("Make sure the role actually exists in this Discord server!");
        }
    }
}
