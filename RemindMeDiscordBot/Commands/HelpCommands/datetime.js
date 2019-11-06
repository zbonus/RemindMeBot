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

        if (date.length == 3 && time.length == 2)
        {
            dt = `${date[2]}-${date[0]}-${date[1]} ${time[0]}:${time[1]}:00`;
            console.log(`datetime: reminder datetime = ${datetime}`);
        }
        else
        {
            console.log(`datetime: error in date/time ${date}/${time}`);
        }

        statement = `insert into ${commandName} (id, date/time, text) values ('${userID}', '${dt}', '${text}');`;
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
            console.log(`date: reminder datetime = ${datetime}`);
        }
        else
        {
            console.log(`date: error in date/time ${date}/${time}`);
        }
        
        statement = `insert into ${commandName} (id, date/time, text) values ('${userID}', '${dt}', '${text}');`;
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
            console.log(`time: reminder datetime = ${datetime}`);
        }
        else
        {
            console.log(`time: error in date/time ${date}/${time}`);
        }
        
        statement = `insert into ${commandName} (id, date/time, text) values ('${userID}', '${dt}', '${text}');`;
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
