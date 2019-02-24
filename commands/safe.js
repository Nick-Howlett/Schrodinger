exports.run = (client, message) =>{
    const safeZoneMessage = `Safe Zones:
    - All academic buildings
    - All dining halls, excluding the **first floor of Bartlett** but including 
        the rooms on the first floor of Bartlett (i.e. BARS and Bart Mart)
    - The stairs **immediately** outside of Cathey Dining Hall
    - All dorms **except for Breckinridge House**
    - The area around the hospital (**This is a no-play zone**)
    - Inside vehicles, such as cars and shuttles (**This is a no-play zone**)`;
    message.channel.send(safeZoneMessage)
}

exports.perms = 0;