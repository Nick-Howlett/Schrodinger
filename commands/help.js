exports.run = (client, message, args) => {
    const keys = client.commands.filter(command => command.perms == 0).keyArray();
    const commandString = `Server commands are as follows: \n * ${keys.join("\n -")}`;
    message.channel.send(commandString);
}

exports.perms = 0;