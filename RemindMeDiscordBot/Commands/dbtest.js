module.exports = {
    name: 'dbtest',
    execute(client, message, args, dbConn) {
        function printQueryResults(sql, results) {
            console.log(sql);
            results.forEach(function (item) {
                console.log(`${item.user_id} ${item.react_id} ${item.message}`);
            });
        }

        var test1passed = false;
        //TODO: insert call to !remindme 12/20/2019 23:59 "End of fall semester"
        var sql = `SELECT * FROM single WHERE user_id = '${message.author.id}'`;
        dbConn.query(sql, function (error, results, fields) {
            if (results.length == 1 && !error) {
                message.channel.send("Database Test 1: Passed");
                printQueryResults(sql, results);
                test1passed = true;
            } else if (error) {
                console.log(error);
                message.channel.send("Database Test 1: Failed. General database error");
                printQueryResults(sql, results);
                return;
            } else {
                message.channel.send(`Database Test 1: Failed. Expected only 1 reminder; instead got ${results.length}.`);
                printQueryResults(sql, results);
            }
        });

        if (test1passed) {
            sql = `DELETE FROM single WHERE user_id = '${message.author.id}'`;
            dbConn.query(sql);
        }
    }
}