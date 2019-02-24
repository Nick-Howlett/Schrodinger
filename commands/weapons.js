exports.run = (client, message) => {
    weaponsString = `**Blasters must be clearly identifiable as toys and must have a recognizably orange tip.** Ammunition must be made out \
of only foam, rubber, felt, and adhesives. Ammunition must be fired from a blaster to be valid. Ammunition cannot contain additional materials \
(plastic, knives, gunpowder, metal balls, etc.) **Retrieve fallen ammunition if at all possible.**
Socks are permitted as weapons provided they are single, unitary, unmodified socks. \
Socks must also be clean and not filled with anything, including other socks.  **Socks must be thrown, \
and not used for melee purposes.**
You may use the new nerf rivals foam ball guns, but you **have to use brightly-colored ammunition**, not the dark blue balls. \
This is to make it easier to find and pick up ammo and avoid littering.`
    message.channel.send(weaponsString);
}

exports.perms = 0;