module.exports = (client, message) => {
    if(message.slice(0, config.prefix.length) !== config.prefix) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if(!cmd) return;
    cmd.run(client, message, args);
}