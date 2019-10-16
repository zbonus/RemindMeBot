module.exports = {
    name: 'rolldice',
    description: 'Choose random number between 0 and the given integer',
    args: true,
    usage: '<int>',
    execute(message, args) {
        var rand = (Math.random() *args[0]) + 1;
        message.channel.send(`${Math.trunc(rand)}`);
    }
};