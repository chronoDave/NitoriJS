// Utils
const { getMembers } = require('../../utils');
const {
  STATUS,
  REPLY,
  TYPE
} = require('../../utils/const');

// Controller
const guildController = require('./guild.controller');

// Utils
const { getRandomMinMax } = require('../../utils');

module.exports = {
  username: ({ input, client, event }) => {
    let response = null;

    if (input.length > 0) {
      try {
        const username = input.join(' ');
        client.user.setUsername(username);
        response = REPLY.NAME.SUCCESS(username);
      } catch (err) {
        console.error(err);
        response = REPLY.NAME.ERROR;
      }
    } else {
      response = REPLY.NAME.NO_INPUT;
    }

    event.reply(response);
  },
  avatar: ({ input, client, event }) => {
    let response = null;

    if (input.length > 0) {
      try {
        client.user.setAvatar(input[0]);
        response = REPLY.AVATAR.SUCCESS;
      } catch (err) {
        console.error(err);
        response = REPLY.AVATAR.ERROR;
      }
    } else {
      response = REPLY.AVATAR.NO_INPUT;
    }

    event.reply(response);
  },
  guild: async ({ input, client, event }) => {
    const guilds = await client.cache.read(TYPE.COLLECTION.GUILD);
    const guildObject = guilds
      .map(({ _id, ...rest }) => ({ [_id]: { ...rest } }))
      .reduce((acc, cur) => ({ ...acc, ...cur }));

    if (input.length === 0) return guildController.list({ guilds, event });
    if (!guildObject[input[0]] && input[0] !== 'this') return event.reply(REPLY.GUILD.INVALID);

    const id = input[0] === 'this' ? event.channel.guild.id : input[0];
    const guildProps = {
      id,
      guild: guildObject[id],
      event,
      client,
      input: input.slice(2),
    };

    switch (input[1]) {
      case TYPE.ACTION.PREFIX:
        return guildController.prefix(guildProps);
      case TYPE.ACTION.LEAVE:
        return guildController.leave(guildProps);
      default:
        return guildController.info(guildProps);
    }
  },
  status: async ({ client, input: rawInput, event }) => {
    if (rawInput.length === 0) {
      const randomStatus = STATUS[getRandomMinMax(0, STATUS.length - 1)];
      await client.user.setActivity(randomStatus.status, { type: randomStatus.type });
      return event.reply(REPLY.STATUS.SUCCESS(
        randomStatus.type.toLowerCase(),
        randomStatus.status
      ));
    }
    const input = await getMembers(rawInput, event);

    const validActivities = Object.values(TYPE.ACTIVITY);
    const activity = validActivities.includes(input[0].toUpperCase()) ? input[0] : 'playing';
    const status = input.slice(1).join(' ');

    try {
      await client.user.setActivity(status, { type: activity });
      return event.reply(REPLY.STATUS.SUCCESS(
        activity.toLowerCase(),
        status
      ));
    } catch (err) {
      console.error(err);
      return event.reply(REPLY.STATUS.ERROR);
    }
  }
};
