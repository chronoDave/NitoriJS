// Utils
const {
  markupCode,
  markupBlock,
  getColor
} = require('../../utils');
const {
  TYPE,
  REPLY
} = require('../../utils/const');

module.exports.info = {
  name: TYPE.PLUGIN.HELP,
  description: REPLY.DESCRIPTION.HELP,
  fields: [{
    name: '<empty>',
    value: 'Display all loaded plugins'
  }, {
    name: '[plugin]',
    value: 'Display plugin information'
  }]
};

module.exports.route = props => {
  const {
    client,
    event,
    input,
    guild
  } = props;

  const plugins = client.plugins.keyArray();
  const help = markupCode(`${guild.prefix}help [plugin]`);
  const decorator = '\n\u2000\u2022\u2000';

  if (input.length === 0) {
    const pluginList = markupBlock(`${decorator}${plugins.join(decorator)}`);

    return event.reply(REPLY.HELP.LIST(pluginList, help));
  }

  const plugin = input[0];

  if (!plugins.includes(plugin)) return event.reply(REPLY.HELP.INVALID(help));

  const { fields, description } = client.plugins.get(plugin);
  const embed = {
    author: { name: `\uD83D\uDD0D Plugin: ${plugin}` },
    color: getColor(TYPE.COLOR.GREEN),
    description: REPLY.HELP.PLUGIN(description, markupCode(plugin)),
    fields
  };

  return event.channel.send({ embed });
};
