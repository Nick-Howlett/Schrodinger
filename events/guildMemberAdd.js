module.exports = (client, member) => {
    humanWelcome = `Welcome to the official UChicago Humans vs Zombies Discord server! According to your status in the game, \
you are registered as a human! You will have access to the humans only chats, as well as the general and information chats. Please \
take a moment to read through the #rules and #faq channels!

As a reminder, humans must have their bandana around their arms over all of their clothing. **While on campus, players may not remove their bandana.** \
Please use caution with running up and down stairs and across streets. Lastly, please make sure you pick up your ammo. We don't want to litter. 

Best of luck! `;
    zombieWelcome = `Welcome to the official UChicago Humans vs Zombies Discord server! According to your status in the game, you are registered as a zombie! \
You will have access to the zombies only chats, as well as the general and information chats. Please take a moment to read through the #rules and #faq channels! 

As a reminder, zombies can have their bandana around either their head or their neck, **but it must be visible from 360°.While on campus, players may not remove their bandana.** \
Please use caution with running up and down stairs and across streets. Lastly, when you get stunned, please take a moment to help the other player pick up their ammo. We don't want to litter.

Happy hunting!
    `;

    client.playerdb.find_user(member.user.tag, row =>{
        if(row){
            row.human ? member.addRole(client.guildconstants[member.guild.id].human) : member.addRole(client.guildconstants[member.guild.id].zombie); 
            row.human ? member.send(humanWelcome) : member.send(zombieWelcome)
        }
        else{
            member.send(`Welcome to the official UChicago Humans vs Zombies Discord server! I don't seem to recognize your discord username.  Please head over to uchicagohvz.org to register your discord account with me! For reference, your discord username is: ${member.user.tag}`);
        }
    });
}