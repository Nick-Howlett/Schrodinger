module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    client.guilds.tap(guild => {
      client.guildconstants[guild.id] = {zombie: 0, human: 0};
      client.guildconstants[guild.id].zombie = guild.roles.find(role => role.name === "Zombies");
      client.guildconstants[guild.id].human = guild.roles.find(role => role.name === "Humans");
      client.guildconstants[guild.id].lz = guild.roles.find(role => role.name === "LZ");
      client.guildconstants[guild.id].webhook_channel = guild.channels.find(channel => channel.name === "webhook");
  });
}