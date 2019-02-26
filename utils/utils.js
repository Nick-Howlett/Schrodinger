module.exports = {
    find_by_tag : (guild, tag) => {
        return guild.members.find(member => member.user.tag === tag);
    },
    
    kill_player : (client, guildmember) => {
        killString = `Welcome to being a zombie! You no longer have access to the human only chats, but you now have access to the zombie only chats. 
As a reminder, zombies can have their bandana around either their head or their neck, *but it must be visible from 360°.While on campus, players may not \
remove their bandana.* Please use caution with running up and down stairs and across streets. Lastly, when you get stunned, please take a moment to help the other \
player pick up their ammo. We don't want to litter.
Happy hunting!`;
        guildmember.addRole(client.guildconstants[guildmember.guild.id].zombie);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.send(killString);
        return;
    },
    
    revive_player : (client, guildmember) => {
        guildmember.addRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].zombie);
        return;
    },
    
    remove_roles : (client, guildmember) => {
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].zombie);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].human);
        guildmember.removeRole(client.guildconstants[guildmember.guild.id].lz);
        return;
    }
}
