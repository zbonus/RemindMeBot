module.exports = {
    name: 'info',
    description: 'Information about the arg provided',
    args: true,
    usage: '<commandname>',
    execute(message, args) {
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    }
}