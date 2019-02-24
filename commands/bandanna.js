exports.run = (client, message, args) => {
    const bandannaString = `Q: How should I wear my bandana? \n A: If you\'re a human, the bandana\
must be around your upper arm over all layers of clothing.  If you\'re a zombie, the bandana \
can be worn either around your neck or your head. Bandanas which are not visible from 360° are \
not legally worn and tags by zombies without legal bandana placement will be discounted The bandana \
must be worn at all times except when leaving campus.`;
    message.channel.send(bandannaString)
};

exports.perms = 0;