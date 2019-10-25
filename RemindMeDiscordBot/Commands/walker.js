module.exports = {
    name: 'walker',
    description: 'You\'re welcome Walker 😃',
    args: false,
    execute(client, message, args) {
        message.channel.send({files: ['/god.jpg']});
    }
}