const presences = require('../resources/presence.json');

const statusRouter = async (bot, message, args) => {
  if (args.length === 0) {
    const response = 'What status do you have in mind?';
    return message.reply(response);
  }

  const type = args[0];
  const rawStatus = await Promise.all(
    args.map(arg => new Promise(async resolve => {
      try {
        if (arg.includes('<@')) {
          const memberId = arg.match(/(\d+)/g)[0];
          const member = await message.guild.fetchMember(memberId);
          resolve(member.nickname || member.user.username);
        }
        resolve(arg);
      } catch (err) {
        console.log(err);
        resolve('???');
      }
    }))
  );
  const status = rawStatus.splice(1).join(' ');

  if (!type) {
    const response = 'I\'m sorry, what?';
    return message.reply(response);
  }

  const setPresence = async (response, presence) => {
    try {
      bot.user.setPresence({ game: { ...presence } });
      return message.reply(response);
    } catch (err) {
      console.log(err);
      return message.reply('I don\'t feel like doing something else right now...');
    }
  };

  switch (type) {
    case 'random': {
      const getRandomIndex = array => Math.floor(Math.random() * array.length);

      const keys = Object.keys(presences);
      const randomType = keys[getRandomIndex(keys)];

      const values = presences[randomType];
      const randomName = values[getRandomIndex(values)];

      return setPresence(
        `Let's see... I'll be ${randomType.toLowerCase()}${randomType === 'LISTENING' ? ' to ' : ' '}${randomName}, then!`,
        { type: randomType, name: randomName }
      );
    }
    case 'listening':
      return setPresence(
        `Alright, I'll be listening to ${status}!`,
        { type: 'LISTENING', name: status }
      );
    default:
      return setPresence(
        `Alright, I'll be ${type.toLowerCase()} ${status}!`,
        { type, name: status }
      );
  }
};

module.exports = {
  statusRouter
};
