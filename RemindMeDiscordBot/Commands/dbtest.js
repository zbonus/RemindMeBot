module.exports = {
    name: 'dbtest',
    execute(client, message, args, dbConn) {

        if (isNaN(args[0])) {
            args[0] = 1;
        }

        var test1passed = false;
        var test2passed = false;

        //dbtest 1 (single)
        if (args[0] == 1) {
            var sql = `SELECT * FROM single WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql, function (error, results, fields) {
                if (results.length == 1 && !error) {
                    message.channel.send("Database Test 1: Passed");
                    dbConn.printQueryResults(sql, results);
                    test1passed = true;
                } else if (error) {
                    console.log(error);
                    message.channel.send("Database Test 1: Failed. General database error");
                    dbConn.printQueryResults(sql, results);
                    return;
                } else {
                    message.channel.send(`Database Test 1: Failed. Expected only 1 reminder; instead got ${results.length}.`);
                    dbConn.printQueryResults(sql, results);
                }
            });
        }

        //TODO:dbtest 2 (group)
        if (args[0] == 2) {
            var sql = `SELECT * FROM multiple WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql, function (error, results, fields) {
                if (results.length == 1 && !error) {
                    message.channel.send("Database Test 2: Passed");
                    dbConn.printQueryResults(sql, results);
                    test2passed = true;
                } else if (error) {
                    console.log(error);
                    message.channel.send("Database Test 2: Failed. General database error");
                    dbConn.printQueryResults(sql, results);
                    return;
                } else {
                    message.channel.send(`Database Test 2: Failed. Expected only 1 reminder; instead got ${results.length}.`);
                    dbConn.printQueryResults(sql, results);
                }
            });
        }

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