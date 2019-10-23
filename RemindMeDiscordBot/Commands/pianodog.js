module.exports = {
    name: 'pianodog',
    description: 'Sends the best MTU logo known to existence',
    execute(client, message, args) {
        message.channel.send({files: ['./pDog.png']});
    }
};