module.exports = {
    name: 'echo',
    description: 'Repeats back whatever the user says.',
    execute(message, args) {
        let text = '';

        for (let i = 0; i < args.length; i++) {
            text += `${args[i]} `;
        }

        return message.channel.send(`${text}`);        
    },
};