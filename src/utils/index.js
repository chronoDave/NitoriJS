// Utils
const {
  TYPE,
  MODIFIERS
} = require('./const');

const getGuild = async (db, id, payload) => {
  let guild = await db.readOne(TYPE.COLLECTION.GUILD, id);

  if (!guild) {
    guild = await db.create(TYPE.COLLECTION.GUILD, { _id: id, ...payload });
  }

  return Promise.resolve(guild);
};

const getMembers = (input, event) => Promise.all(input
  .map(text => new Promise(resolve => {
    if (!text.includes('<@')) return resolve(text);
    const userId = text.match(/(\d+)/g)[0];
    return event.guild.fetchMember(userId)
      .then(member => resolve(member.nickname || member.user.username))
      .catch(err => {
        console.error(err);
        return resolve('???');
      });
  })));

const getRandomMinMax = (min, max) => Math.round(Math.random() * (max - min) + min);

const getTruth = input => {
  let truth = '';

  for (let i = 0; i < input.length; i += 1) {
    truth += input.substr(i, 1);

    const loopCount = Math.floor(2 + Math.random() * 31);
    for (let j = 0; j < loopCount; j += 1) {
      const modIndex = Math.floor(Math.random() * MODIFIERS.length);
      truth += MODIFIERS[modIndex];
    }
  }

  return truth;
};

module.exports = {
  getMembers,
  getGuild,
  getRandomMinMax,
  getTruth
};
