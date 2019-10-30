module.exports = {
    name: 'getreminders',
    execute(client, message, args) {
        const mysql = require("mysql");

        var connection = mysql.createConnection({
            host: "classdb.it.mtu.edu",
            user: "teamclippy_rw",
            password: "tClippy!",
            database: "teamclippy",
            port: 3307
        });

        connection.connect(err => {
            if(err) throw err;
        });
        
        // make edge case for undefined
        console.log("Connected To Database!");
        var str = "SELECT * FROM single WHERE user_id = " + `${message.author.id}`;
        console.log(str);
        connection.query(str, function (error, results, fields) {
            if(error) {
                console.log(error);
                return;
            }
            var rows = JSON.parse(JSON.stringify(results[0]));
            
            message.channel.send(rows.message);
        });
    }
}