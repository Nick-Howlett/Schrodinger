/*
    Reset roles is triggered when a game ends. We wipe all roles and the database to ensure a fresh start each game.
*/
exports.run = (client, message, args) => {
    message.guild.members.tap( member => { 
        if(!member.user.bot){ //schrodinger should keep their unique status as having both roles at the same time :)
            client.utils.remove_roles(client, member);
        } 
    });
    client.playerdb.reset_table();
};

exports.perms = 2;
