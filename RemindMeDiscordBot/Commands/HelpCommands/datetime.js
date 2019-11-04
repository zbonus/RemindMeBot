module.exports = {
    name: 'datetime',
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
            console.log("Connected To Database!");
            connection.query("", console.log);
        });
    }
};