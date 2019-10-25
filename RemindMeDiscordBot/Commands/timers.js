module.exports = {
    name: 'timers',
    description: 'pings user after a certain time interval in seconds.',
    args: true,
    usage: '<time interval (seconds)>',
    execute(client, message, args) {
        if (isNaN(args[0]))
        {
            message.channel.send('Please input a decimal number.');
        }
        else
        {
            msecs = args[0] * 1000;
            setTimeout(timerdone, `${msecs}`, client,  message, args[0]);
        }
    },
};

function timerdone(client , message, arg)
{
    if (arg <= 0)    
    {
        message.reply('please enter a positive number.');
    }
    else if (arg == 1)
    {
        message.reply('1 second has passed.');
    }
    else
    {
        message.reply(`${arg} seconds have passed.`);
    }
}