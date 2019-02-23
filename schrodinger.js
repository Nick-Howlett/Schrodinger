const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const playerdb = require('./playerdb');

console.log("Booting up Schrodinger");

const client = new Discord.Client();
const guildconstants = {};

client.login(auth.token);

client.on("ready", () => {
    console.log("Schrodinger Online");
    client.guilds.tap(guild => {
        guildconstants[guild.id] = {zombie: 0, human: 0};
        guildconstants[guild.id].zombie = guild.roles.find(role => role.name === "Zombies");
        guildconstants[guild.id].human = guild.roles.find(role => role.name === "Humans");
        guildconstants[guild.id].lz = guild.roles.find(role => role.name === "LZ");
        guildconstants[guild.id].webhook_channel = guild.channels.find(channel => channel.name === "webhook");
    });
});



const prefix = "!";

   
client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    let text = message.content.slice(1);
    let args = text.split(" ");

    //!breck

    //!register

    //!safe

    //!noplay

    //!commands

    //!help

    //!weapons





    switch(args[0]) {
        case "bandanna":
            message.channel.send("Q: How should I wear my bandana? \n A: If you\'re a human, the bandana must be around your upper arm over all layers of clothing.  If you\'re a zombie, the bandana can be worn either around your neck or your head. Bandanas which are not visible from 360°  are not legally worn and tags by zombies without legal bandana placement will be discounted The bandana must be worn at all times except when leaving campus.");
        break;

        case "bandana": //who even knows which it is
        message.channel.send("Q: How should I wear my bandana? \n A: If you\'re a human, the bandana must be around your upper arm over all layers of clothing.  If you\'re a zombie, the bandana can be worn either around your neck or your head. Bandanas which are not visible from 360°  are not legally worn and tags by zombies without legal bandana placement will be discounted The bandana must be worn at all times except when leaving campus.");
        break;

        /*
            Reset roles is triggered when a game ends. We wipe all roles and the database to ensure a fresh start each game.
        */

        case "reset_roles":
            if(message.channel !== guildconstants[message.guild.id].webhook_channel)  return;
            message.guild.members.tap( member => { 
                if(!member.user.bot){ //schrodinger should keep their unique status as having both roles at the same time :)
                    remove_roles(member);
                } 
            });
            playerdb.reset_table();
        break;

        /*
        Register player not only registers new players, but also registers the deaths and revives of players. 
        Register player is triggered server-side whenever a player is saved to the database, and we update if the player isn't in the database already
        or if the player's life or death status has changed. 
        */
        case "register_player":
            if(message.channel !== guildconstants[message.guild.id].webhook_channel)  return;
            player = find_by_tag(message.guild, args[1]);
            console.log(args[1]);
            console.log(player);
            message.guild.members.tap(member => console.log(member.user.tag));
            playerdb.find_user(args[1], row =>{
                if(row){
                    if(row.human === 1 && parseInt(args[2]) === 0){
                        playerdb.update_user(args[1], 0); 
                        if(player){
                            kill_player(player);
                        }
                    }
                    else if(row.human === 0 && parseInt(args[2]) === 1){
                        playerdb.update_user(args[1], 1);
                        if(player){
                            revive_player(player);
                        }
                    }
                }
                else{
                    playerdb.register_user(args[1], args[2]);
                    if(player){
                        console.log(parseInt(args[2]));
                        parseInt(args[2]) ? player.addRole(guildconstants[player.guild.id].human) : player.addRole(guildconstants[player.guild.id].zombie);
                    }
                }
            });
        break;
    }
});

client.on('guildMemberAdd', member => {
    playerdb.find_user(member.user.tag, row =>{
        if(row){
            row.human ? member.addRole(guildconstants[member.guild.id].human) : member.addRole(guildconstants[member.guild.id].zombie); 
            member.send(`Welcome to the server! You have been assigned a role of ${row.human ? "human" : "zombie"} based on your discord tag!`);
        }
        else{
            member.send(`Welcome to the server! We don't recognize your discord tag! If you're interested in joining the human or zombie channels, please go to the current game's page at www.uchicagohvz.org and enter your discord tag!`)
        }
    });
});


function find_by_tag(guild, tag){
    return guild.members.find(member => member.user.tag === tag);
}

function kill_player(guildmember){
    guildmember.addRole(guildconstants[guildmember.guild.id].zombie);
    guildmember.removeRole(guildconstants[guildmember.guild.id].human);
    guildmember.send("You have been killed! Your role is now Zombie. Enjoy feasting on brains!");
    return;
}

function revive_player(guildmember){
    guildmember.addRole(guildconstants[guildmember.guild.id].human);
    guildmember.removeRole(guildconstants[guildmember.guild.id].zombie);
    guildmember.send("You have been revived! Your role is now Human. Be sure to thank the mods. Maybe buy them a coffe or something I dunno.");
    return;
}

function remove_roles(guildmember){
    guildmember.removeRole(guildconstants[guildmember.guild.id].zombie);
    guildmember.removeRole(guildconstants[guildmember.guild.id].human);
    guildmember.removeRole(guildconstants[guildmember.guild.id].lz);
    return;
}