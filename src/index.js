const {
  Client,
  Collection
} = require('discord.js');

// Lib
const NeDB = require('./lib/nedb');

// Router
const mainRouter = require('./routers');

// Plugins
const plugins = require('./plugins');

// Utils
const { getRandomMinMax } = require('./utils');
const {
  STATUS,
  TYPE
} = require('./utils/const');

// Config
const config = process.env.NODE_ENV === 'development' ?
  require('./utils/config.dev') :
  require('./utils/config');

const client = new Client({
  disableEveryone: config.disableEveryone
});
client.cache = new NeDB(TYPE.COLLECTION.GUILD, '.');
client.plugins = new Collection();

client.on('ready', async () => {
  console.log('Booting up MahoBot...');

  // Load plugins
  Object.values(plugins).forEach(plugin => {
    if (!plugin.info) console.error(`Invalid metadata plugin: ${JSON.stringify(plugin.info)}`);
    if (!plugin.route || typeof plugin.route !== 'function') console.error(`Invalid run function: ${JSON.stringify(plugin.route)}`);

    client.plugins.set(plugin.info.name, {
      ...plugin.info,
      route: plugin.route
    });
    console.log(` - Added plugin: ${plugin.info.name}`);
  });

  // Invite
  console.log('Generating invites...');

  const minimalInvite = await client.generateInvite(TYPE.PERMISSION.MINIMAL);
  const basicInvite = await client.generateInvite(TYPE.PERMISSION.BASIC);
  const fullInvite = await client.generateInvite(TYPE.PERMISSION.FULL);

  console.log(`Minimal invite: ${minimalInvite}`);
  console.log(`Basic invite: ${basicInvite}`);
  console.log(`Full invite: ${fullInvite}`);

  // Status
  const randomStatus = STATUS[getRandomMinMax(0, STATUS.length - 1)];
  await client.user.setActivity(
    randomStatus.status,
    { type: randomStatus.type }
  );
  console.log(`Set status to: ${randomStatus.type} ${randomStatus.status}`);

  console.log('MahoBot successfully initialized');
});

client.on('message', async event => {
  if (event.author.bot) return; // Ignore bots and self
  mainRouter({ event, client, config });
});

client.login(config.token);
