exports.run = (client, message, args) => {
    chaseMessage = `The chase clause: if a zombie is actively pursuing/stalking a human when that human crosses \
out of the immediate area of campus, moving from an unsafe zone to a safe zone, then that human remains to be \
unsafe for the duration of the chase/stalk, regardless of whether or not they know they are being chased or stalked. \
If, at any time, the zombie chasing/stalking the human makes any reasonable indication that they are giving up the \
chase/stalk, the human’s location immediately reverts to a safe zone. If a human is chased into a building, then the \
zombie must give up the pursuit.`
    message.channel.send(chaseMessage);
}

exports.perms = 0;