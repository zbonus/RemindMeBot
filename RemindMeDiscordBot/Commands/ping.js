module.exports = {
    name: 'ping',
    description: 'Pings the user with a pong',
    execute(client, message, args) {
        message.reply('PONG');
    },
};