const serverRouter = async (bot, message, args) => {
  if (args.length === 0) return message.reply('I\'m sorry, what?');

  const type = args[0];
  switch (type) {
    case 'list': {
      const serverKeys = bot.guilds.keyArray();
      const servers = [];

      serverKeys.forEach(key => {
        const guild = bot.guilds.get(key);
        servers.push(`${guild.name} [${guild.memberCount}]: ${guild.owner.user.username}`);
      });

      return message.reply(`I'm part of the following servers: \n - ${servers.join('\n - ')}`);
    }
    default:
      return message.reply('I\'m sorry, what?');
  }
};

module.exports = {
  serverRouter
};
