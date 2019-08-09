const Sequelize = require('sequelize');
const { get } = require('https');

module.exports.info = {
  name: 'cleverbot'
};

const database = async (bot, command, cs) => {
  const Cleverbot = bot.database.instance.define('cleverbot', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    cs: Sequelize.STRING
  });

  Cleverbot.sync();
  const id = 'NitoriJS';

  switch (command) {
    case 'create':
      await Cleverbot.create({ id, cs: id });
      return console.log('Created Cleverbot database');
    case 'get': {
      const doc = await Cleverbot.findOne({ where: { id } });
      if (doc) return doc.dataValues.cs;
      return 'default';
    }
    case 'set': {
      await Cleverbot.update({ cs }, { where: { id } });
      return null;
    }
    default:
      return null;
  }
};

module.exports.run = async (bot, config, message, args) => {
  message.channel.stopTyping();

  const cs = await database(bot, 'get');
  if (!cs) await database(bot, 'create');

  get(`https://www.cleverbot.com/getreply?key=${config.cleverToken}&input=${args.join(' ')}&cs=${cs}`, res => {
    message.channel.startTyping();
    if (res.statusCode !== 200) {
      message.channel.stopTyping();
      message.reply('...');
    } else {
      const chunks = [];

      res.on('data', data => chunks.push(data));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        const json = JSON.parse(body);

        if (json.cs) database(bot, 'set', json.cs);

        message.channel.stopTyping();
        message.reply(json.interaction_1_other || json.interaction_1);
      });
    }
  });
};
