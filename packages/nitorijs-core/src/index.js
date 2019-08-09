const Discord = require('discord.js');
const config = require('./config');
const Database = require('./database');

const Nitori = new Discord.Client({ disableEveryone: true });
Nitori.plugins = new Discord.Collection();
Nitori.prefix = new Discord.Collection(); // Prefix cache
Nitori.database = Database.create();

Nitori.on('ready', async () => {
  console.log('Booting NitoriJS...');

  config.add(Nitori.plugins);

  console.log('Discord successfully initialized, Nitori ready for duty!');
});

Nitori.on('message', async message => {
  const { content, author } = message;
  const guildId = message.guild.id;

  if (author.bot) return null; // Ignore bots

  // Message
  const messageArray = content.split(' ');
  const args = messageArray.splice(1);

  // Prefix
  if (!Nitori.prefix.get(guildId)) {
    let server = await Nitori.database.prefix.get(guildId);

    if (!server) server = await Nitori.database.prefix.set(guildId, config.prefix);

    Nitori.prefix.set(guildId, server.prefix); // Cache prefix
  }
  const serverPrefix = Nitori.prefix.get(guildId);

  // Nitori
  if (message.isMentioned(Nitori.user.id) || message.channel.type === 'dm') {
    let response;

    if (args.length === 0) {
      if (Nitori.plugins.size === 0) {
        response = 'My commands? I don\'t seem to have any loaded right now...';
      } else {
        response = `My commands? Sure, here you go:\n${Nitori.plugins.keyArray().join('\n')}`;
      }
    }

    if (args[0] === 'prefix') {
      if (!args[1]) {
        response = `I'm currently using \`${serverPrefix}\` as prefix.`;
      } else {
        await Nitori.database.prefix.update(guildId, args[1]);

        const server = await Nitori.database.prefix.get(guildId);
        Nitori.prefix.set(guildId, server.prefix); // Update cache

        response = `Updated prefix to: \`${server.prefix}\``;
      }
    }

    return message.reply(response);
  }

  // Commands
  const command = messageArray[0];

  if (!command.includes(serverPrefix)) return null; // Ignore regular messages

  const cleanCommand = command.slice(serverPrefix.length);
  const plugin = Nitori.plugins.get(cleanCommand);

  if (plugin) return plugin(Nitori, config, message, args);

  return null;
});

Nitori.login(config.discordToken);
