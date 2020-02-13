// Utils
const { getRandomMinMax } = require('../../utils');
const { TYPE } = require('../../utils/const');

const wisdom = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  '( ͡° ͜ʖ ͡°)',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
];

module.exports.info = {
  name: TYPE.PLUGIN.MBALL,
  description: '8-ball plugin, inspired by Zach\'s text adventures',
  fields: [{
    name: '[question]',
    value: 'Answers your question'
  }]
};

module.exports.route = ({ event, input }) => {
  if (input.length === 0) return event.channel.send(`:8ball: \`${wisdom[14]}\``);
  return event.channel.send(
    `:8ball: \`${wisdom[getRandomMinMax(0, wisdom.length - 1)]}\``
  );
};
