/*
    Reset roles is triggered when a game ends. We wipe all roles and the database to ensure a fresh start each game.
*/
exports.run = (client, message, args) => {
    if(message.channel !== guildconstants[message.guild.id].webhook_channel)  return;
    message.guild.members.tap( member => { 
        if(!member.user.bot){ //schrodinger should keep their unique status as having both roles at the same time :)
            remove_roles(member);
        } 
    });
    playerdb.reset_table();
}
