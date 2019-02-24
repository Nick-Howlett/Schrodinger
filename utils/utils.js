module.exports = {
    find_by_tag : (guild, tag) => {
        return guild.members.find(member => member.user.tag === tag);
    },
    
    kill_player : (client, guildmember) => {
        guildmember.addRole(client.guildconstants[guildmember.guild.id].zombie);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.send("You have been killed! Your role is now Zombie. Enjoy feasting on brains!");
        return;
    },
    
    revive_player : (client, guildmember) => {
        guildmember.addRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].zombie);
        guildmember.send("You have been revived! Your role is now Human. Be sure to thank the mods. Maybe buy them a coffe or something I dunno.");
        return;
    },
    
    remove_roles : (client, guildmember) => {
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].zombie);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].lz);
        return;
    }
}
