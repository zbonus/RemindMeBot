module.exports = {
    datetype: function(commandName, value, type, text, userID)
    {
        // get current date and time
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();
        dt = '';

        if (type == 'm')
        {
            today.setMinutes(minute + parseInt(value));
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
        }
        else if (type == 'h')
        {
            today.setHours(hour + parseInt(value));
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
        }
        else if (type == 'd')
        {
            today.setDate(day + parseInt(value));
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
        }
        else if (type == 'w')
        {
            today.setDate(day + (parseInt(value) * 7));
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();

        }
        else if (type == 'mo')
        {
            today.setMonth(month - 1 + parseInt(value));
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
        }
        else if (type == 'y')
        {
            today.setFullYear(year + parseInt(value));
            year = today.getFullYear();
        }
        else 
        {
            console.log(`datetype: incorrect type of ${type}`);
            return 0;
        }

        // format datetime
        dt = `${year}-${month}-${day} ${hour}:${minute}:00`;

        userID = String(userID).substring(2,20);
        // prepare the mysql statement with given input for the 'single' table
        statement = `insert into single (user_id, dateNtime, message) values ('${userID}', '${dt}', '${text}');`;
        console.log(`datetime: statement = ${statement}`);

        return statement;
    }
}