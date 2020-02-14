// Utils
const { getColor } = require('../../utils');
const {
  TYPE,
  REPLY
} = require('../../utils/const');

// Data
const script = require('./script');
const synonyms = require('./synonyms');

const STATE = {
  START: 'start',
  PLAYING: 'playing'
};

module.exports.info = {
  name: TYPE.PLUGIN.CFTA,
  description: REPLY.DESCRIPTION.CTFA,
  fields: [{
    name: 'start',
    value: 'Start the game'
  }]
};

const getValidAction = input => {
  if (Array.isArray(input) || !input) return 'default';

  const validActions = Object.values(synonyms);
  const action = validActions
    .map((actions, index) => ({
      index,
      valid: actions.includes(input.toLowerCase())
    }))
    .filter(actions => actions.valid);

  if (action.length === 0) return 'default';
  return Object.keys(synonyms)[action[0].index];
};

const handleText = props => {
  const {
    client,
    event,
    response,
    beat,
    embed
  } = props;

  event.channel.send({
    embed: {
      ...embed,
      title: beat.title,
      description: beat.text.join('\n\n'),
      fields: [response]
    }
  });

  if (beat.edit) {
    setTimeout(() => {
      client.user.lastMessage.edit({
        embed: {
          ...embed,
          description: beat.edit.join('\n\n')
        }
      });
    }, 4000);
  }
};

const handleUpdate = props => {
  const {
    guild,
    player,
    client,
    session,
    input
  } = props;
  const action = getValidAction(input[0]);

  const currentBeat = script[session.chapter][session.beat];
  const beatAction = currentBeat.actions[action] || currentBeat.actions.default;

  const response = {
    name: input.join(' ') || 'enter command',
    value: input[0] ?
      beatAction[getValidAction(input[1])] || beatAction :
      `${guild.prefix}${TYPE.PLUGIN.CFTA} [command]`
  };

  // Advance
  if (Array.isArray(response.value)) {
    client.persistent.set(player, {
      ...session,
      chapter: response.value[0],
      beat: response.value[1]
    });
    const nextBeat = script[response.value[0]][response.value[1]];

    handleText({
      beat: nextBeat,
      response: {
        name: 'enter command',
        value: `${guild.prefix}${TYPE.PLUGIN.CFTA} [command]`
      },
      ...props
    });
  } else {
    handleText({ beat: currentBeat, response, ...props });
  }
};

module.exports.route = props => {
  const { client, event } = props;

  const player = event.author.id;
  let session = client.persistent.get(player);

  const embed = {
    author: {
      name: 'Chronofantasia: The Text Adventure'
    },
    color: getColor(TYPE.COLOR.PURPLE)
  };

  if (!session) {
    session = {
      state: STATE.START,
      chapter: 0,
      beat: 0
    };
    client.persistent.set(player, session);
  }

  const updateProps = {
    session,
    embed,
    player,
    ...props
  };

  switch (session.state) {
    case STATE.START: {
      client.persistent.set(player, {
        ...session,
        state: STATE.PLAYING
      });
      event.channel.send({
        embed: {
          ...embed,
          description: REPLY.DESCRIPTION.CTFA
        }
      });
      return setTimeout(() => handleUpdate(updateProps), 1000);
    }
    case STATE.PLAYING: return handleUpdate(updateProps);
    default: return console.error(session.state);
  }
};
