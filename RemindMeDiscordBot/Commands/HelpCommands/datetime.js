module.exports = {

    datetime: function(commandName, date, time, text, userID)
    {
        // get current date and time
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        dt = '';

        if (date.length == 3 && time == 0) // if only date given
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${hour}:${minute}:00`;
            console.log(`date input: reminder datetime = ${dt}`);
        }
        else if (date == 0 && time.length == 2) // if only time given
        {
            dt = `${year}-${month}-${day} ${time[0]}:${time[1]}:00`;
            console.log(`time input: reminder datetime = ${dt}`);
        }
        else if (date.length == 3 && time.length == 2) // if date and time given
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${time[0]}:${time[1]}:00`;
            console.log(`datetime input: reminder datetime = ${dt}`);
        }
        else // if something went wrong with date/time input
        {
            console.log(`datetime: error in date/time ${date}/${time}`);
        }
        
        userID = String(userID).substring(2,20);
        // prepare the mysql statement with given input for the 'single' table
        statement = `insert into single (user_id, dateNtime, message) values ('${userID}', '${dt}', '${text}');`;
        console.log(`datetime: statement = ${statement}`);

        if (dt == '')
        {
            // if something went wrong with date/time input return 0
            return 0;
        }
        else
        {  
            return statement;
        }
    },
};