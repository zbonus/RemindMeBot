module.exports = {
    name: 'deletereminder',
    description: 'Allows a user to delete one of their stored reminders',
    args: true,
    usage: '<react_id> <table>',
    execute(client, message, args, dbConn) {
        const mysql = require("mysql");
        var reactid = message.content.split(" ");
        var query;
        if(String(reactid[2]).toLowerCase() === 'single') {
            query = "DELETE FROM single WHERE react_id = " + `${reactid[1]}` + " AND user_id = " + `${message.author.id}`;
        }
        else if(toLowerCase(String(reactid[2])) === 'group') {
            query = "DELETE FROM group WHERE react_id = " + `${reactid[1]}` + " AND user_id = " + `${message.author.id}`;
        }
        else {
            message.channel.send("Error! Incorrect table name!");
        }
        dbConn.query(query, function(error) {
            if(error) {
                console.log(error);
                message.channel.send("DB Error");
                return;
            }
            else {
                message.channel.send("Reminder successfully deleted!");
            }  
        })
    }
}