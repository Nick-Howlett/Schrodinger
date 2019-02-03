var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

var client = new Discord.Client();

client.login(auth.token);

client.on("ready", () => {
    console.log("I am ready!");
});
const prefix = "!";
   
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    var text = message.content.slice(1);
    var args = text.split(" ");
    switch(args[0]) {

        case "ping":
            message.channel.send("Pong!");
        break;

        case "bandanna":
            message.channel.send("Q: How should I wear my bandana? \n A: If you\'re a human, the bandana must be around your upper arm over all layers of clothing.  If you\'re a zombie, the bandana can be worn either around your neck or your head. Bandanas which are not visible from 360°  are not legally worn and tags by zombies without legal bandana placement will be discounted The bandana must be worn at all times except when leaving campus.");
        break;

        case "addrole":
            var user = client.users.find(user => user.username === args[1]);
            var guild_user = message.guild.members.get(user.id);
            var role = message.guild.roles.find(role => role.name === args[2]);
            guild_user.addRole(role.id);
        break; 

        case "deleterole":
        var user = client.users.find(user => user.username === args[1]);
        var guild_user = message.guild.members.get(user.id);
        var role = guild_user.roles.find(role => role.name === args[2]);
        guild_user.removeRole(role.id);
        break;           
    };
});


function find_by_name(client, username){
    
}