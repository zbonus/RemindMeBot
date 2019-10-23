module.exports = {
    name: 'timerm',
    description: 'pings user after a certain time interval in minutes.',
    args: true,
    usage: '<time interval (minutes)>',
    execute(client, message, args) {
        if (isNaN(args[0]))
        {
            message.channel.send('Please input a decimal number.');
        }
        else
        {
            msecs = args[0] * 1000 * 60;
            setTimeout(timerdone, `${msecs}`, client,  message, args[0]);
        }
    },
};

function timerdone(client , message, arg)
{
    if (arg == 1)
    {
        message.reply('1 minute has passed');
    }
    else
    {
        message.reply(`${arg} minutes have passed.`);
    }
}