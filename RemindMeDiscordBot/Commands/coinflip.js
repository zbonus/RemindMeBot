module.exports = {
    name: 'coinflip',
    description: 'Flips a coin',
    execute(message, args) {
        
        i = Math.floor(Math.random() * Math.floor(2));
        
        if (i == 0) {
            message.reply('Heads');
        }

        if (i == 1) {
            message.reply('Tails');
        }       

    },
};