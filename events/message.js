module.exports = (client, message) => {
    if(message.content.slice(0, client.config.prefix.length) !== client.config.prefix) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if(!cmd) return;
    if(cmd.perms === 2 && message.channel !== client.guildconstants[message.guild.id].webhook_channel) return;
    cmd.run(client, message, args);
}