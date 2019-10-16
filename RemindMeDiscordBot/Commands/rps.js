const choices = ["⛰", "✂", "📰"];

module.exports = {
    name: 'rps',
    description: 'Allows you to play rock-paper-scissors with the bot',
    args: false,
    run: async(client, message, args) => {        
        const msg = await message.channel.send("React below to play Rock Paper Scissors!");
        const reacted = await promptMessage(msg, message.author, 30, choices);
        const botchoice = choices[Math.floor(Math.random() * choices.length)];
        const result = await getResult(reacted, botchoice);
        await msg.clearReactions();
        msg.delete();
        message.channel.send(result + ` ${reacted} vs ${botchoice}`);

        async function promptMessage(message, author, time, reactions) {
            time *= 1000;
            for(const reaction of reactions) await message.react(reaction);
            message.react("🔫");
            const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
            return message.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
        }
        function getResult(me, clientChose) {
            if((me === "⛰" && clientChose === "✂") ||
                (me === "✂" && clientChose === "📰") ||
                (me === "📰" && clientChose === "⛰")) {
                    return "You won!";
                }
            else if(me === clientChose) {
                return "We tied!";
            }
            else if(me === "🔫") {
                return "Cheater";
            }
            else {
                return "Haha I win";
            }
        }
    }
}