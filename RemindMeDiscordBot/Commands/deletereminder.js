module.exports = {
    name: 'deletereminder',
    description: 'Allows a user to delete one of their stored reminders',
    args: true,
    usage: '<react_id>',
    execute(client, message, args, dbConn) {
        dbConn.query(`SELECT user_id FROM id WHERE react_id = ${args[0]}`, function (error, results) {  // get user id of the given react_id
            if (error) {
                console.log(error);
                message.channel.send("Internal Database Error. Please check your arguemnts, or report the problem to the developers.");
                return;
            }
            if (uid !== message.author.id) {    // if the react_id is linked to a different user, do not let them know
                message.channel.send("A reminder with this ID does not exist");
                return;
            }
            a(args[0], results[0]["user_id"]);  // move to the next phase if successful
        });

        function a(rid, uid) {
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