const Droll = require('droll');

// Utils
const { markupCode } = require('../../utils');
const {
  TYPE,
  REPLY
} = require('../../utils/const');

module.exports.info = {
  name: TYPE.PLUGIN.DROLL,
  description: REPLY.DESCRIPTION.DROLL,
  fields: [{
    name: '[dice]',
    value: 'Rolls dice'
  }]
};

module.exports.route = props => {
  const { input, event } = props;

  if (input.length === 0) return event.reply(REPLY.DROLL.NO_INPUT);

  const hand = input[0];

  if (Droll.validate(hand)) {
    const { numDice } = Droll.parse(hand);

    if (numDice > 100) return event.reply(REPLY.DROLL.INVALID_NUM);

    const result = Droll.roll(hand);

    return event.channel.send(`:game_die: ${markupCode(result.toString())}`);
  }
  return event.reply(REPLY.DROLL.INVALID);
};
