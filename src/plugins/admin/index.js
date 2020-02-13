// Controller
const controller = require('./admin.controller');

// Utils
const {
  TYPE,
  REPLY
} = require('../../utils/const');

module.exports.info = {
  name: TYPE.PLUGIN.ADMIN
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
    default: return event.reply(REPLY.GENERAL.NO_INPUT);
  }
};
