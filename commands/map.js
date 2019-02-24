exports.run = (client, message) => {
    message.channel.send({
        files: [{
          attachment: './assets/map.jpg',
          name: 'map.jpg'
        }]
      });
};

exports.perms = 0;