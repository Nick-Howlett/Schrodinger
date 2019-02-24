/*
Register player not only registers new players, but also registers the deaths and revives of players. 
Register player is triggered server-side whenever a player is saved to the database, and we update if the player isn't in the database already
or if the player's life or death status has changed. 
*/
exports.run = (client, message, [tag, human]) => {
    if(message.channel !== client.guildconstants[message.guild.id].webhook_channel)  return;
    player = client.utils.find_by_tag(message.guild, tag);
    client.playerdb.find_user(tag, row =>{
        if(row){
            if(row.human === 1 && parseInt(human) === 0){
                client.playerdb.update_user(tag, 0); 
                if(player){
                    client.utils.kill_player(client, player);
                }
            }
            else if(row.human === 0 && parseInt(human) === 1){
                client.playerdb.update_user(tag, 1);
                if(player){
                    client.utils.revive_player(client, player);
                }
            }
        }
        else{
            client.playerdb.register_user(tag, human);
            if(player){
                parseInt(human) ? player.addRole(client.guildconstants[player.guild.id].human) : player.addRole(client.guildconstants[player.guild.id].zombie);
            }
        }
    });
}

exports.perms = 2;