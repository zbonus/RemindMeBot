const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log('Logged in');
});

client.on('message', message => {
  console.log(message.content);
  if(!message.content.startsWith(prefix)) return;

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
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('Internal error');
  }

});

client.login(token);