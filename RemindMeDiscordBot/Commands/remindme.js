const { datetime } = require("./HelpCommands/datetime.js");
const { date } = require("./HelpCommands/datetime.js");
const { time } = require("./HelpCommands/datetime.js");
module.exports = {
    name: 'remindme',
    description: 'Reminds the user of a given event at a given time',
    usage: '!remindme <Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder">',
    args: true,
    execute: async(client, message, args) => {        
        
        // Splits the command from the reaction message. The reaction message is stored in msg[1]
        const msg = message.content.split("\"");

        /* 
        *  Splits the command info off from the command itself and stores it in reminder[1]
        *  Formatted like:
        *  reminder = {<commandname>, <date or time>, <time>, <empty string>}
        */

        const reminder = msg[0].split(" ");

        // Stores the date information into two corresponding variables.
        var datesplit = reminder[1];
        var timesplit = reminder[1];

        console.log(msg);
        console.log(reminder);

        // Regexes to check if the formatting is correct for dates and times

        const timeRegex = /^(([2]{1}[0-3]{1}:{1})|([0-1]?[0-9]{1}:{1}))([0-5]{1}[0-9]{1})$/
        const dateRegex = /^((1|01|3|03|5|05|7|07|8|08|10|12){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}[0-1]{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((4|04|6|06|9|09|11){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}0{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((2|02){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|)(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))$/

        // Stores todays date information in corresponding variables

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
        var both = 0;
        var statement;
        if(reminder.length == 3) {
            timeTest(reminder[1]);
            if(timebool > 0) {

            }
            else {
                dateTest(reminder[1]);
            }
        }
        if(reminder.length == 4) {
            dateTest(reminder[1]);
            if(datebool >= 1) {
                timesplit = reminder[2];
                timeTest(reminder[2]);
                if(timebool >= 1) {
                    both = 1;
                    if(month == datesplit[0] && day == datesplit[1] && year == datesplit[2]) {
                        if(timebool == 1) {
                            datebool = 1;
                        }
                    }
                    else if(hour <= timesplit[0] && minute <= timesplit[1]) {
                        if(datebool == 1) {
                            timebool == 1;
                        }
                    }
                }
            }
            else {
                timesplit = reminder[1];
                timeTest(reminder[1]);
                if(timebool == 1) {
                    both = 2;
                }
            }
        }
        else {
            
        }
        if(timebool == 2) {
            message.channel.send("Improper Time given!");
            message.channel.send("Make sure that your time entered is after the current time if no date is given!");
            message.channel.send("For example the current time for me is:\`" + hour + ':' + minute + "\` is not valid by itself, but is valid if a date is given later than today's date.");
        }
        if (datebool == 2) {
            message.channel.send("Improper date given!");
            message.channel.send("Make sure that your date entered is after today's date if no time is given!");
            message.channel.send("For example today's date:\`" + month + '/' + day + '/' + year + "\` is not valid by itself, but is valid if a time is given later than the current time.");
        }
        if(both == 2) {
            message.channel.send("Improper format!");
            message.channel.send("Make sure the time comes AFTER the date!");
        }
        else if(both == 1) {
            statement = datetime(reminder[0], datesplit, timesplit, msg[1], message.author);
            message.channel.send("Called date and time");
        }
        else if (datebool == 1) {
            statement = date(reminder[0], datesplit, 0, msg[1], message.author);
            console.log(statement);
            message.channel.send("Called date command!");
        }
        else if (timebool == 1) {
            statement = time(reminder[0], 0, timesplit, msg[1], message.author);
            message.channel.send("Called time command!");
        }
        else {
            message.channel.send("Improper formatting");
            message.channel.send(`The proper usage would be:\n\`!remindme <Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder">\``);
        }
        console.log(datesplit);
        const Discord = require('discord.js');
        var clippy = "631146919502020620";
        if(both == 1) {
            const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1])
                .addField("Date:", datesplit[0] + '/' + datesplit[1] + '/' + datesplit[2], true)
                .addField("Time:", timesplit[0] + ':' + timesplit[1], true);
            message.channel.send(exampleEmbed);
        }
        else if(datebool == 1 || timebool == 1) {
            const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1]);
            if(datebool == 1) {
                exampleEmbed.addField("Date:", reminder[1], true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            if(timebool == 1) {
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", reminder[1], true);
            }
            message.channel.send(exampleEmbed);

        }
        
        function timeTest(time_str) {
            if(timeRegex.test(time_str)) {
                timebool = 1;
                timesplit = timesplit.split(":");
                console.log(timesplit);
                if(datebool == 1) {
                    timebool = 1;
                }
                else if(timesplit[0] < hour) {
                    timebool = 2;
                }
                else if(timesplit[0] == hour) {
                    if(timesplit[1] < minute) {
                        timebool = 2;
                    }
                    else if(timesplit[1] == minute) {
                        timebool = 2;
                    }
                }
                if(timesplit[0].length == 1) {
                    timesplit[0] = timesplit[0].padStart(2, '0');
                }
            }
        }
        function dateTest(date_str) {
            if(dateRegex.test(date_str)) {
                datebool = 1;
                datesplit = datesplit.replace(/\//g, "-");
                datesplit = datesplit.split("-");
                console.log(datesplit);
                if(timebool == 1) {
                    datebool = 1;
                }
                else if(datesplit[2] < year) {
                    datebool = 2;
                    console.log("Year fail");
                }
                else if(datesplit[2] == year) {
                    if(datesplit[0] < month) {
                        datebool = 2;
                        console.log("month fail");
                    }
                    else if(datesplit[0] == month) {
                        if(datesplit[1] < day) {
                            datebool = 2;
                            console.log("day fail");

                        } 
                        else if(datesplit[1] == day) {
                            datebool = 2;
                        }
                    }
                }
                if(datesplit[1].length == 1) {
                    datesplit[1] = String(datesplit[1]).padStart(2, '0');
                }
                if(datesplit[0].length == 1) {
                    datesplit[0] = String(datesplit[0]).padStart(2, '0');
                }
            }
        }
    }
}