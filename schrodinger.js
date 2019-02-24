const Discord = require('discord.js');
const logger = require('winston');
const config = require('./config.json');
const utils = require("./utils/utils.js")
const playerdb = require('./utils/db_utils.js');
const Enmap = require("enmap");
const fs = require("fs");

console.log("Booting up Schrodinger");

const client = new Discord.Client();
client.guildconstants = {};
client.config = config;
client.utils = utils;
client.playerdb = playerdb;

fs.readdir(`${__dirname}/events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`${__dirname}/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir(`${__dirname}/commands/`, (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        let props = require(`${__dirname}/commands/${file}`);  
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
}); 

client.login(config.token);

