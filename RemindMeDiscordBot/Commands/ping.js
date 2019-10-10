module.exports = {
    name: 'ping',
    description: 'Pings the user with a pong',
    execute(message, args) {
        message.reply('PONG');
    },
};