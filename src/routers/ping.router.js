const { get } = require('https');

// Utils
const { getGuild } = require('../utils');
const {
  TYPE,
  REPLY
} = require('../utils/const');

module.exports = async props => {
  const { event, client, config } = props;

  const guild = await getGuild(
    client.cache,
    event.channel.guild.id,
    { name: event.channel.guild.name, prefix: config.prefix }
  );

  const inputArray = event.content.split(' ');

  if (inputArray.length <= 1) return event.reply(REPLY.GENERAL.PREFIX(guild.prefix));
  if (!config.clever.token) return null;

  let instance = guild.clever;
  if (!instance) {
    const newGuild = await client.cache.updateOne(
      TYPE.COLLECTION.GUILD,
      event.channel.guild.id,
      { $set: { clever: guild.name } }
    );
    instance = newGuild.clever;
  }

  const url = TYPE.URL.CLEVER({
    token: config.clever.token,
    input: inputArray.slice(1).join(' '),
    session: instance
  });

  event.channel.startTyping();
  return get(url, response => {
    if (response.statusCode !== 200) {
      event.reply('...');
      event.channel.stopTyping(true);
    } else {
      const chunks = [];

      response.on('data', data => chunks.push(data));
      response.on('end', async () => {
        const body = Buffer.concat(chunks).toString();
        const json = JSON.parse(body);

        if (json.cs) {
          await client.cache.updateOne(
            TYPE.COLLECTION.GUILD,
            event.channel.guild.id,
            { $set: { clever: json.cs } }
          );
        }

        event.reply(json.interaction_1_other || json.interaction_1);
        event.channel.stopTyping();
      });
    }
  });
};
