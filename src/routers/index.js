// Routers
const dmRouter = require('./dm.router');
const groupRouter = require('./group.router');
const pingRouter = require('./ping.router');
const pluginRouter = require('./plugin.router');
const voiceRouter = require('./voice.router');
const categoryRouter = require('./category.router');
const newsRouter = require('./news.router');
const storeRouter = require('./store.router');

// Utils
const {
  getGuild,
  getTruth
} = require('../utils');

/**
 * @param {Object} props
 * @param {Object} props.event
 * @param {Object} props.client
 * @param {Object} props.config
 */
module.exports = async props => {
  switch (props.event.channel.type) {
    case 'dm':
      dmRouter(props);
      break;
    case 'group':
      groupRouter(props);
      break;
    case 'text': {
      // Inject truth
      const guild = await getGuild(
        props.client.cache,
        props.event.channel.guild.id,
        {
          name: props.event.channel.guild.name,
          prefix: props.config.prefix
        }
      );

      if (props.event.isMentioned(props.client.user.id)) {
        pingRouter({
          ...props,
          event: {
            ...props.event,
            reply: (input, options) => props.event.reply(
              guild.truth ? getTruth(input) : input,
              options
            )
          }
        });
      } else {
        pluginRouter(props);
      }
      break;
    }
    case 'voice':
      voiceRouter(props);
      break;
    case 'category':
      categoryRouter(props);
      break;
    case 'news':
      newsRouter(props);
      break;
    case 'store':
      storeRouter(props);
      break;
    default:
      break;
  }
};
