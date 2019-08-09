// Routers
const { avatarRouter } = require('../router/avatarRouter');
const { nameRouter } = require('../router/nameRouter');
const { statusRouter } = require('../router/statusRouter');
const { serverRouter } = require('../router/serverRouter');

module.exports.info = {
  name: 'admin'
};

module.exports.run = (bot, config, message, args) => {
  if (config.owner !== message.author.id) return message.reply('And who do you think you are?');
  if (args.length === 0) return message.reply('I\'m sorry, what?');

  switch (args[0]) {
    case 'avatar': return avatarRouter(bot, message, args.splice(1));
    case 'name': return nameRouter(bot, message, args.splice(1));
    case 'status': return statusRouter(bot, message, args.splice(1));
    case 'server': return serverRouter(bot, message, args.splice(1));
    default: return message.reply('I\'m sorry, what?');
  }
};
