// Utils
const { TYPE } = require('../utils/const');

const getGuild = async (db, id, payload) => {
  let guild = await db.readOne(TYPE.COLLECTION.GUILD, id);

  if (!guild) {
    guild = await db.create(TYPE.COLLECTION.GUILD, { _id: id, ...payload });
  }

  return Promise.resolve(guild);
};

module.exports = async props => {
  const { event, client, config } = props;

  const guild = await getGuild(
    client.cache,
    event.channel.guild.id,
    { name: event.channel.guild.name, prefix: config.prefix }
  );

  const inputArray = event.content.split(' ');

  if (inputArray[0].includes(guild.prefix)) {
    const id = inputArray[0].slice(guild.prefix.length);
    const plugin = client.plugins.get(id);

    if (plugin) {
      plugin.route({
        guild,
        input: inputArray.slice(1),
        ...props
      });
    }
  }
};
