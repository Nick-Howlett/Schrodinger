const Discord = require('discord.js');
const logger = require('winston');
const config = require('./config.json');
const utils = require("./utils/utils.js")
const playerdb = require('./utils/db_utils.js');
const Enmap = require("enmap");
const fs = require("fs");

console.log("Booting up Schrodinger");

const client = new Discord.Client();
const guildconstants = {};

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

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    })
});

client.login(config.token);

