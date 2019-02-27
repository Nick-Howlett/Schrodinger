exports.run = (client, message, args) => {
    const regString = `If you're interested in joining the human/zombies channels please go to \ 
www.uchicagohvz.com, click on the current game, and write your discord username in the box provided!`
    message.channel.send(regString);
}

exports.perms = 0;