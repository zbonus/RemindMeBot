process.on('uncaughtException', err => {
  console.error("", err);
  client.channels.get("631930424930730020").send("An uncaught exception has occurred. Please report this problem to the developers and any details about what you did that caused this error.\n" +
    `Error: ${err.name}\n` + `Message: ${err.message}\n` + `Timestamp: ${new Date().toString()}\n`);
  console.log("An uncaught exception was detected. See details above.");
});

const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require("./config.json");
const mysql = require('mysql');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var dbConn = mysql.createConnection({
    host: "classdb.it.mtu.edu",
    user: "teamclippy_rw",
    password: "tClippy!",
    database: "teamclippy",
    port: 3307,
    multipleStatements: true
});

dbConn.connect(err => {
    if (err) {
      console.error("", err);
      console.log("There was a problem connecting to the database. The bot has terminated.");
      process.exit(2);
    }
});

dbConn.printQueryResults = function (sql, results) {
    console.log(sql);
    results.forEach(function (item) {
        console.log(`${item.user_id} ${item.react_id} ${item.message}`);
    });
};

var pendingReminders = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Logged in');
  pingDB();
  setInterval(pingDB, 60000);
});

client.on('message', async message => {
  globalMsg = message;
  console.log(message.content);
  if (!message.content.startsWith(prefix) || message.author.bot) {
    if (!(message.author.id === "633350865356587008") && !message.content.startsWith(prefix)) {
      return;
    }      
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) {
    //message.channel.send(`Invalid command. Please type \`${prefix}help\` for a list of valid commands.`);
    return;
  }
  const command = client.commands.get(commandName);

  if (commandName === 'info') {
    const information = client.commands.get(args[0]);
    if (!args.length || !client.commands.has(args[0])) {
      return message.channel.send('You didn\'t provide a command or the command does not exist');
    } else {
      return message.channel.send(`\`${information.name}: ${information.description}\``); 
    }
  }

  if (command.args && !args.length) {
    let reply = 'You did not provide any arguments';
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.execute(client, message, args, dbConn);
  } catch (error) {
    console.error(error);
    message.reply('Internal Error. Please try again, or report the problem to the developers and what you did that caused this error.');
  }
});

function triggerReminder(reactID, userID, dateNtime, message) {
  var user = client.users.get(userID);
  user.sendMessage(`Reminder at ${dateNtime}: ${message}`);
  var sql = `DELETE FROM single WHERE react_id = ${reactID}`;
  console.log(sql);
  dbConn.query(sql, function(item) {});
}

var runningTime = 0;
var queryTimeout = 0;
function pingDB() {
  var sql = `SELECT * FROM single WHERE dateNtime < ADDTIME(NOW(), '0 0:01:00.00')`;
  dbConn.query(sql, function (error, results) {
    if (results == undefined) {
      Console.log("Unable to query database");
      queryTimeout++;
      if (queryTimeout == 3) {
        try {
          message.channel.send("Cannot connect to database. Bot has terminated.");
        } catch (error) {
          Console.log("We are terminating. Check database connection.");
        }
        process.exit(3);
      }
    } else {
      results.forEach(function(item) {
        console.log(item["dateNtime"].toString());
        var timeRemaining = Date.parse(item["dateNtime"].toString()) - new Date().getTime();
        setTimeout(triggerReminder.bind(this, item["react_id"], item["user_id"], item["dateNtime"].toString(), item["message"]), timeRemaining);
      });
      console.log(`${new Date().toString().substring(0, 24)} ${runningTime++}: ${results.length} pending reminders within the next 60 seconds`);
    }
  });
}

client.login(token);