module.exports = {

    datetime: function(commandName, date, time, text, userID)
    {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        dt = '';

        if (date.length == 3 && time == 0)
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${hour}:${minute}:00`;
            console.log(`date input: reminder datetime = ${dt}`);
        }
        else if (date == 0 && time.length == 2)
        {
            dt = `${year}-${month}-${day} ${time[0]}:${time[1]}:00`;
            console.log(`time input: reminder datetime = ${dt}`);
        }
        else if (date.length == 3 && time.length == 2)
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${time[0]}:${time[1]}:00`;
            console.log(`datetime input: reminder datetime = ${dt}`);
        }
        else
        {
            console.log(`datetime: error in date/time ${date}/${time}`);
        }

        statement = `insert into single (user_id, dateNtime, message) values ('${userID}', '${dt}', '${text}');`;
        console.log(`datetime: statement = ${statement}`);

        if (dt == '')
        {
            return 0;
        }
        else
        {
            return statement;
        }
    },

    date: function(commandName, date, time, text, userID)
    {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        dt = '';

        if (date.length == 3 && time == 0)
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${hour}:${minute}:00`;
            console.log(`date: reminder datetime = ${dt}`);
        }
        else
        {
            console.log(`date: error in date/time ${date}/${time}`);
        }
        
        statement = `insert into single (user_id, dateNtime, message) values ('${userID}', '${dt}', '${text}');`;
        console.log(statement);

        if (dt == '')
        {
            return 0;
        }
        else
        {
            return statement;
        }
    },

    time: function(commandName, date, time, text, userID)
    {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        dt = '';
        
        if (date == 0 && time.length == 2)
        {
            dt = `${year}-${month}-${day} ${time[0]}:${time[1]}:00`;
            console.log(`time: reminder datetime = ${dt}`);
        }
        else
        {
            console.log(`time: error in date/time ${date}/${time}`);
        }
        
        statement = `insert into single (user_id, dateNtime, message) values ('${userID}', '${dt}', '${text}');`;
        console.log(statement);

        if (dt == '')
        {
            return 0;
        }
        else
        {
            return statement;
        }
    }
};
