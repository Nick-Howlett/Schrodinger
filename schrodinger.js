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
    })
});



const prefix = "!";

   
client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    let text = message.content.slice(1);
    let args = text.split(" ");

    switch(args[0]) {
        case "bandanna":
            message.channel.send("Q: How should I wear my bandana? \n A: If you\'re a human, the bandana must be around your upper arm over all layers of clothing.  If you\'re a zombie, the bandana can be worn either around your neck or your head. Bandanas which are not visible from 360°  are not legally worn and tags by zombies without legal bandana placement will be discounted The bandana must be worn at all times except when leaving campus.");
        break;

        case "record_death":
            if(message.author.username !== "Schrodinger") return;
            kill_player(message.guild.members.find(member => member.user.tag === args[1]));
            message.channel.send(`Recorded the death of ${args[1]}`);
        break;

        case "record_resurrection":
            if(message.author.username !== "Schrodinger") return;
            revive_player(message.guild.members.find(member => member.user.tag === args[1]));
            message.channel.send(`Recorded resurrection of ${args[1]}`);
        break;

        case "register_player":
            if(message.author.username !== "Schrodinger") return;
            playerdb.find_user(args[1], row =>{
                if(row){
                    playerdb.update_user(row.id, args[1], args[2]);
                }
                else{
                    playerdb.register_user(args[1], args[2]);
                    message.channel.send(`Registered player ${args[1]} as ${args[2] ? "alive" : "dead"}`);
                }
            });
        break;
    };
});

function kill_player(guildmember){
    guildmember.addRole(guildconstants[guildmember.guild.id].zombie);
    guildmember.removeRole(guildconstants[guildmember.guild.id].human);
    return;
}

function revive_player(guildmember){
    guildmember.addRole(guildconstants[guildmember.guild.id].human);
    guildmember.removeRole(guildconstants[guildmember.guild.id].zombie);
    return;
}