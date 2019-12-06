module.exports = {
    name: 'dbtest',
    execute(client, message, args, dbConn) {

        //If there are no arguments, defualts to dbtest 1
        if (isNaN(args[0])) {
            args[0] = 1;
        }

        var test1passed = false;
        var test2passed = false;

        //dbtest 1 (single)
        if (args[0] == 1) {

            //Sends a query that checks if an entry was placed in the database
            var sql = `SELECT * FROM single WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql, function (error, results, fields) {

                //Passes the test if 1 entry is found in the database
                if (results.length == 1 && !error) {
                    message.channel.send("Database Test 1: Passed");
                    dbConn.printQueryResults(sql, results);
                    test1passed = true;
                } 
                
                //Fails if there is a database error
                else if (error) {
                    console.log(error);
                    message.channel.send("Database Test 1: Failed. General database error");
                    dbConn.printQueryResults(sql, results);
                    return;
                } 

                //Fails if more than 1 reminder is received
                else {
                    message.channel.send(`Database Test 1: Failed. Expected only 1 reminder; instead got ${results.length}.`);
                    dbConn.printQueryResults(sql, results);
                }
            });
        }

        //TODO:dbtest 2 (group)
        if (args[0] == 2) {

            //Sends a query that checks if an entry was placed in the database
            var sql = `SELECT * FROM multiple WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql, function (error, results, fields) {''
                
                //Passes the test if 1 entry is found in the database
                if (results.length == 1 && !error) {
                    message.channel.send("Database Test 2: Passed");
                    dbConn.printQueryResults(sql, results);
                    test2passed = true;
                } 
                
                //Fails if there is a database error
                else if (error) {
                    console.log(error);
                    message.channel.send("Database Test 2: Failed. General database error");
                    dbConn.printQueryResults(sql, results);
                    return;
                } 
                
                //Fails if more than 1 reminder is received
                else {
                    message.channel.send(`Database Test 2: Failed. Expected only 1 reminder; instead got ${results.length}.`);
                    dbConn.printQueryResults(sql, results);
                }
            });
        }

        //Deletes reminders if test passes
        if (test1passed) {
            sql = `DELETE FROM single WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql);
        }
        if (test2passed) {
            sql = `DELETE FROM multiple WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql);
        }
    }
}