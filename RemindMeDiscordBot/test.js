const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const mysql = require("mysql");

var dbConn = mysql.createConnection({
    host: "classdb.it.mtu.edu",
    user: "teamclippy_rw",
    password: "tClippy!",
    database: "teamclippy",
    port: 3307
});

dbConn.connect(err => {
    if(err) throw err;
});

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Logged in');
  setInterval(pingDB, 5000)
});

client.on('message', async message => {
  console.log(message.content);
  if(!message.content.startsWith(prefix) || message.author.bot) {
    if(message.author.id === "633350865356587008");
    else {
      return;
    }      
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if(!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if(commandName === 'info') {
    const information = client.commands.get(args[0]);
    if(!args.length || !client.commands.has(args[0])) {
      return message.channel.send('You didn\'t provide a command or the command does not exist');
    }
    else {
      return message.channel.send(`\`${information.name}: ${information.description}\``); 
    }
  }


  if(command.args && !args.length) {
    let reply = 'You did not provide any arguments';
    if(command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }
  try {
    command.execute(client, message, args, dbConn);
  }
  catch (error) {
    console.error(error);
    message.reply('Internal Error');
  }

});

var pinged = false;
function pingDB() {
  
}

client.login(token);