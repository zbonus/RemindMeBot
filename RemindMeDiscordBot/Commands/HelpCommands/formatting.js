module.exports = {
    formatting: function(reminder) {
        const timeRegex = /^(([2]{1}[0-3]{1}:{1})|([0-1]?[0-9]{1}:{1}))([0-5]{1}[0-9]{1})$/
        const dateRegex = /^((1|01|3|03|5|05|7|07|8|08|10|12){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}[0-1]{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((4|04|6|06|9|09|11){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|(3{1}0{1}))(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))|((2|02){1}(-|\/){1}(([1-2]{1}[0-9]{1})|(0?[1-9]{1})|)(-|\/){1}([2-9]{1}[0-9]{1}[0-9]{1}[0-9]))$/
        const minRegex = /^(min|mins|m|minute|minutes)$/
        const hourRegex = /^(h|hour|hours)$/
        const dayRegex = /^(d|day|days)$/
        const weekRegex = /^(w|week|weeks)$/
        const monthRegex = /^(mo|month|months)$/
        const yearRegex = /^(y|year|years)$/
        // Stores todays date information in corresponding variables

        var datesplit = reminder[1];
        var timesplit = reminder[1];
        var val = 0;
        var timetype;

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
        var bool = 0;
        var statement;

        // Check to make sure the time and date are properly formatted. If time fails, it will then check date.

        if(reminder.length == 3) {
            if(reminder[2].length != 0) {
                console.log("error");
            }
            else if (reminder[2] === '') {
                timeTest(reminder[1]);
                if(timebool > 0) {
                }
                else {
                    dateTest(reminder[1]);
                }
            }
            
        }

        // Checks if both date and time have been inputted. If date is greater than 1 it will continue

        if(reminder.length == 4) {
            if(!isNaN(reminder[1])) {
                valbool = 1;
                if(minRegex.test(reminder[2])) {
                    timetype = "m";
                    console.log("minutes");
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
                else {
                    valbool = 2;
                }
                console.log(timetype);
            }
            dateTest(reminder[1]);
            if(datebool >= 1 && valbool == 0) {
                timesplit = reminder[2];
                timeTest(reminder[2]);
                if(timebool >= 1) {
                    both = 1;
                    
                    /**
                     * Checks if the date is the same as todays date. If it is it then checks if the time is later than the current time.
                     * Same goes for if the current time or earlier is entered but a later date is entered.
                     */ 

                    if(month == datesplit[0] && day == datesplit[1] && year == datesplit[2]) {
                        if(timebool == 1) {
                            datebool = 1;
                        }
                    }
                    else if(hour <= timesplit[0] && minute <= timesplit[1]) {
                        if(datebool == 1) {
                            timebool = 1;
                        }
                    }
                }
            }

            // Checks if time is entered first. If it is then will send an error.

            else if(datebool == 0 && valbool == 0){
                timesplit = reminder[1];
                timeTest(reminder[1]);
                if(timebool == 1) {
                    both = 2;
                }
            }
        }

        // Error checking

        if(valbool == 2) {
            return 'valerr';
        }
        if(timebool == 2) {
            return 'timeerr';
        }
        if (datebool == 2) {
            return 'dateerr';
        }
        if(both == 2) {
            return 'botherr';
        }
        else if(both == 1) {
            return 'both';
        }
        else if(timebool == 1) {
            return 'time';
        }
        else if(datebool == 1) {
            return 'date';
        }
        else if(valbool == 1) {
            return 'val';
        }
        else {
            message.channel.send("Improper formatting");
            message.channel.send(`The proper usage would be:\n\`!remindme <Date (MM-DD-YYYY) and/or Time(Must be in Military Time HH:MM)> <"reminder"> OR \n!remindme <Number greater than zero> <date type(minute, hour, day, week, month, year)> <"reminder">\``);
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

        /**
         * Date testing. Checks to make sure that the date is in the correct format,
         * then checks if the date is after the current date.
         */

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