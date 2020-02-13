// Utils
const { TYPE } = require('./const');

const markup = {
  block: text => `\`\`\`${text}\`\`\``,
  code: text => `\`${text}\``
};

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

module.exports = {
  markup,
  getMembers,
  getGuild,
  getRandomMinMax
};
