exports.run = (client, message) => {
    message.channel.send({
        files: [{
          attachment: `${__dirname}/../assets/map.jpg`,
          name: 'map.jpg' 
        }]
      });
};

exports.perms = 0;