const {
  TYPE,
  REPLY
} = require('../../utils/const');

module.exports = {
  info: ({ guild, event }) => {
    const embed = {
      title: guild.name,
      description: REPLY.GUILD.INFO,
      fields: Object.keys(guild).map(attribute => ({
        name: `${attribute.slice(0, 1).toLocaleUpperCase()}${attribute.slice(1)}:`,
        value: guild[attribute]
      }))
    };
    event.reply({ embed });
  },
  list: ({ guilds, event }) => {
    const embed = {
      title: 'Guilds',
      description: REPLY.GUILD.LIST,
      fields: Object.keys(guilds).map(id => ({
        name: guilds[id].name,
        value: Object.keys(guilds[id])
          .map(attribute => ` \u2022 ${attribute}: ${guilds[id][attribute]}`)
          .join('\n')
      }))
    };
    event.reply({ embed });
  },
  prefix: async props => {
    const {
      event,
      client,
      input,
      id
    } = props;

    if (!input[0]) return event.reply(REPLY.PREFIX.NO_INPUT);

    const guild = await client.cache.updateOne(TYPE.COLLECTION.GUILD, id, {
      $set: { prefix: input[0] }
    });

    return event.reply(REPLY.PREFIX.SUCCESS(guild.prefix));
  },
  leave: async props => {
    const {
      event,
      client,
      guild,
      id
    } = props;

    try {
      await event.channel.guild.leave();
      await client.cache.deleteOne(TYPE.COLLECTION.GUILD, id);
      console.log(`Left: ${guild.id}`);
      if (id !== event.channel.guild.id) return event.reply(REPLY.LEAVE.SUCCESS(guild.name));
      return null;
    } catch (err) {
      console.error(err);
      return event.reply(REPLY.LEAVE.ERROR);
    }
  }
};
