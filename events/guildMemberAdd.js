module.exports = (client, member) => {
    const welcomeNoTag = `Welcome to the server! We don't recognize your discord tag! If you're interested in joining the human or zombie channels, please go to the current game's page at www.uchicagohvz.org and enter your discord tag!`;
    client.playerdb.find_user(member.user.tag, row =>{
        if(row){
            row.human ? member.addRole(client.guildconstants[member.guild.id].human) : member.addRole(client.guildconstants[member.guild.id].zombie); 
            member.send(`Welcome to the server! You have been assigned a role of ${row.human ? "human" : "zombie"} based on your discord tag!`);
        }
        else{
            member.send(welcomeNoTag);
        }
    });
}