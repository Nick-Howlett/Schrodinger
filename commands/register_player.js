/*
Register player not only registers new players, but also registers the deaths and revives of players. 
Register player is triggered server-side whenever a player is saved to the database, and we update if the player isn't in the database already
or if the player's life or death status has changed. 
*/
exports.run = (client, message, [tag, human]) => {
    if(message.channel !== guildconstants[message.guild.id].webhook_channel)  return;
    player = utils.find_by_tag(message.guild, tag);
    playerdb.find_user(tag, row =>{
        if(row){
            if(row.human === 1 && parseInt(human) === 0){
                playerdb.update_user(tag, 0); 
                if(player){
                    utils.kill_player(player);
                }
            }
            else if(row.human === 0 && parseInt(human) === 1){
                playerdb.update_user(tag, 1);
                if(player){
                    utils.revive_player(player);
                }
            }
        }
        else{
            playerdb.register_user(tag, human);
            if(player){
                parseInt(human) ? player.addRole(guildconstants[player.guild.id].human) : player.addRole(guildconstants[player.guild.id].zombie);
            }
        }
    });
}