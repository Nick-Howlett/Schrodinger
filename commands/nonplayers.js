exports.run = (client, message, args) => {
    nonplayerMessage = `Non-players should not be physically involved in the game.  In particular, non-players \
should not actively or involuntarily aid the cause of a player. For example, using non-players as spies is acceptable, \
but hiding behind a pedestrian in order to use them as a shield is not permissible.
Additionally, a non-player should not actively and voluntarily make it difficult for gameplay to occur. \
For example, a non-player should not intentionally block a hallway to stop a zombie, but a crowd may happen to unintentionally make a thoroughfare impassible.`
message.channel.send(nonplayerMessage);
}

exports.perms = 0;