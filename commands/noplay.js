exports.run = (client, message, channel) => {
    noPlayStr = `Areas of no play are neither play zones nor safe zones. Both humans and zombies are safe in these zones. \
Humans cannot shoot out of these zones.  Play in these areas is grounds for suspension or disqualification from the game. \
The two major no-play zones are all cars (including buses and shuttles) and the area around the hospital. Please refer to #rules for more information.`
    message.channel.send(noPlayStr)
}

exports.perms = 0;