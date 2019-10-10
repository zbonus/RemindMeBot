module.exports = {
    name: 'coinflip',
    description: 'its in the name',
    execute(message, args) {
        message.channel.send('Heads');  
    },
};