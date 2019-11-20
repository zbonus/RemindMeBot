module.exports = {
    name: 'deletereminder',
    description: 'Allows a user to delete one of their stored reminders',
    args: true,
    usage: '<react_id> <flag>',
    execute(client, message, args, dbConn) {
        function dbError(error) {
            console.log(error);
            message.channel.send("Internal Database Error. Please report the problem to the developers.");
        }

        if (args[1]) {
            if (args[1] == "!") {
                dbConn.query(`DELETE FROM multiple WHERE user_id = ${message.author.id};` + 
                             `DELETE FROM single WHERE user_id = ${message.author.id};` +
                             `DELETE FROM id WHERE user_id = ${message.author.id};`, function (error, results) {
                    if (error) {
                        dbError(error);
                        return;
                    }
                    message.reply("your reminders have been deleted");
                });
                return;
            }
            message.channel.send("Heads up! Inserting a '!' in for the second argument of this command will delete all of your reminders. Use with caution!");
            return;
        }

        dbConn.query(`SELECT user_id FROM id WHERE react_id = ${args[0]}`, function (error, results) {  // get user id of the given react_id
            if (error) {
                dbError(error);
                return;
            }
            if (!results[0]) {  // if the reminder is not found
                message.channel.send("A reminder with this ID does not exist");
                return;
            }
            a(args[0], results[0]["user_id"]);  // move to the next phase if successful
        });

        function a(rid, uid) {
            if (uid !== message.author.id) {    // if the react_id is linked to a different user, do not let them know
                message.channel.send("A reminder with this ID does not exist");
                return;
            }
            dbConn.query("SELECT * FROM (" +    // find the table that the reminder resides in
                            "SELECT * FROM (" +
                                "SELECT react_id, user_id, 'single' AS table_name FROM single" +
                            ") A UNION (" +
                                "SELECT react_id, user_id, 'multiple' AS table_name FROM multiple" +
                            ")" +
                         `) B WHERE react_id = ${rid} AND user_id = ${uid};` 
            , function (error, results) {
                if (error) {
                    console.log(error);
                    message.channel.send("Internal Database Error. Please report the problem to the developers.");
                    return;
                }
                if (results.length == 0 && results.length != 1) {   // if more then one row returns, then something is wrong
                    message.channel.send("A reminder with this ID does not exist");
                    return;
                } else {
                    b(results[0]["react_id"], results[0]["table_name"]);    // move to the next phase if successful
                }
            });
        }

        function b(rid, tid) {
            dbConn.query(`DELETE FROM ${tid} WHERE react_id = ${rid};\n` +  // deletes the reminder from the database
                         `DELETE FROM id WHERE react_id = ${rid};`, function (error) {
                if (error) {
                    console.log(error);
                    message.channel.send("Internal Database Error. Please report the problem to the developers.");
                    return;
                } else {
                    message.channel.send(`Reminder ${rid} successfully deleted`);
                    return;
                }
            });
        }
    }
}