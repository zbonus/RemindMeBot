module.exports = {
    name: 'echo',
    description: 'Repeats back whatever the user says.',
    args: true,
    usage: '<text>',
    execute(message, args) {
        text = '';

        for (let i = 0; i < args.length; i++) {
            text += `${args[i]} `;
        }

        message.channel.send(`${text}`);        
    },
};