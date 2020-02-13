// Controller
const controller = require('./admin.controller');

// Utils
const {
  TYPE,
  REPLY
} = require('../../utils/const');

module.exports.info = {
  name: TYPE.PLUGIN.ADMIN,
  description: REPLY.DESCRIPTION.ADMIN,
  fields: [{
    name: 'avatar [url]',
    value: 'Change my avatar'
  }, {
    name: 'username [name]+',
    value: 'Change my name'
  }, {
    name: 'truth',
    value: 'Toggle truth'
  }, {
    name: 'status',
    value: 'I\'ll start doing something randomly'
  }, {
    name: 'status [activity] [status]',
    value: 'I\'ll start doing whatever you\'ll tell me to'
  }, {
    name: 'guild',
    value: 'Display all guilds I\'m part of'
  }, {
    name: 'guild [id]',
    value: 'Display guild information'
  }, {
    name: 'guild [id] prefix [prefix]',
    value: 'Set a new prefix for the specified guild'
  }, {
    name: 'guild [id] leave',
    value: 'I\'ll leave that specific guild'
  }]
};

module.exports.route = props => {
  const {
    event,
    config,
    input
  } = props;

  if (config.owner !== event.author.id) return event.reply(REPLY.ADMIN.INVALID);
  if (input.length === 0) return event.reply(REPLY.GENERAL.NO_INPUT);

  const routeProps = {
    ...props,
    input: input.slice(1)
  };

  switch (input[0].toLowerCase()) {
    case TYPE.ACTION.AVATAR: return controller.avatar(routeProps);
    case TYPE.ACTION.GUILD: return controller.guild(routeProps);
    case TYPE.ACTION.STATUS: return controller.status(routeProps);
    case TYPE.ACTION.USERNAME: return controller.username(routeProps);
    case TYPE.ACTION.TRUTH: return controller.truth(routeProps);
    default: return event.reply(REPLY.GENERAL.NO_INPUT);
  }
};
