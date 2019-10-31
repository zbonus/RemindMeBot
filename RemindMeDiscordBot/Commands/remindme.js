module.exports = {
    name: 'remindme',
    description: 'Reminds the user of a given event at a given time',
    usage: '!remindme <Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder">',
    args: true,
    execute: async(client, message, args) => {        
        
        // Splits the command from the reaction message. The reaction message is stored in msg[1]
        const msg = message.content.split("\"");

        // Splits the command info off from the command itself and stores it in reminder[1]
        const reminder = msg[0].split(" ");

        var datesplit = reminder[1];
        console.log(msg);
        console.log(reminder);
        const timeRegex = /^(([2]{1}[0-3]{1}:{1})|([0-1]?[0-9]{1}:{1}))([0-5]{1}[0-9]{1})$/
        const dateRegex = /^((1|01|3|03|5|05|7|07|8|08|10|12){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}[0-1]{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((4|04|6|06|9|09|11){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}0{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((2|02){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|)(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))$/

        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        console.log(day);
        console.log(month);
        console.log(year);
        var time = 0;
        var date = 0;
        var both = 0;
        var i = 0;
        if(reminder.length == 3) {
            if(timeRegex.test(reminder[1])) {
                time = 1;
                datesplit = datesplit.split(":");
                console.log(datesplit);
                if(datesplit[0] < hour) {
                    time = 2;
                }
                else if(datesplit[0] == hour) {
                    if(datesplit[1] < minute) {
                        time = 2;
                    }
                    else if(datesplit[1] == minute) {
                        time = 2;
                    }
                }
                if(datesplit[0].length == 1) {
                    datesplit[0] = datesplit[0].padStart(2, '0');
                }
            }
            
            else if(dateRegex.test(reminder[1])) {
                date = 1;
                datesplit = datesplit.replace(/\//g, "-");
                datesplit = datesplit.split("-");
                console.log(datesplit);
                if(datesplit[2] < year) {
                    date = 2;
                    console.log("Year fail");
                }
                else if(datesplit[2] == year) {
                    if(datesplit[0] < month) {
                        date = 2;
                        console.log("month fail");
                    }
                    else if(datesplit[0] == month) {
                        if(datesplit[1] < day) {
                            date = 2;
                            console.log("day fail");

                        } 
                        else if(datesplit[1] == day) {
                            date = 2;
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
        else {
            
        }
        if (time == 1) {
            //Call time
            //debug
            message.channel.send("Called time command!");
        }
        else if(time == 2) {
            message.channel.send("Improper Time given!");
            message.channel.send("Make sure that your time entered is after the current time if no date is given!");
            message.channel.send("For example the current time for me is:\`" + hour + ':' + minute + "\` is not valid by itself, but is valid if a date is given later than today's date.");
        }
        else if (date == 1) {
            //Call date
            //debug
            message.channel.send("Called date command!");
        }
        else if (date == 2) {
            message.channel.send("Improper date given!");
            message.channel.send("Make sure that your date entered is after today's date if no time is given!");
            message.channel.send("For example today's date:\`" + month + '/' + day + '/' + year + "\` is not valid by itself, but is valid if a time is given later than the current time.");
        }
        else {
            message.channel.send("Improper formatting");
            message.channel.send(`The proper usage would be:\n\`!remindme <Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder">\``);
        }
        console.log(datesplit);
        const Discord = require('discord.js');
        var clippy = "631146919502020620";
        if(date == 1 || time == 1) {
            const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle("Reminder created!")
                .setAuthor(message.author.username + "'s reminder", message.author.avatarURL)
                .setThumbnail("https://cdn.vox-cdn.com/thumbor/PnCzeDLvefGL_DYVk4TlxTLhNkQ=/0x0:1062x705/1200x800/filters:focal(447x269:615x437)/cdn.vox-cdn.com/uploads/chorus_image/image/63280536/clippy.0.jpg")
                .setDescription(msg[1]);
            if(date == 1) {
                exampleEmbed.addField("Date:", reminder[1], true);
                exampleEmbed.addField("Time:", hour + ':' + String(minute).padStart(2, '0'), true);
            }
            if(time == 1) {
                exampleEmbed.addField("Date:", month + '/' + day + '/' + year, true);
                exampleEmbed.addField("Time:", reminder[1], true);
            }
            message.channel.send(exampleEmbed);

        }

    }
}