const Discord = require('discord.js');

// Plugins
const config = require('./config');

const Nitori = new Discord.Client({ disableEveryone: true });

Nitori.plugins = new Discord.Collection();
Nitori.servers = new Discord.Collection();

Nitori.on('ready', async () => {
  console.log('Booting NitoriJS...');

  config.add(Nitori.plugins);

  console.log('Discord successfully initialized, Nitori ready for duty!');
});

Nitori.on('message', message => {
  const { content, author } = message;
  const guildId = message.guild.id;

  if (author.bot) return null; // Ignore bots

  // Server
  if (!Nitori.servers.has(guildId)) {
    Nitori.servers.set(guildId, config.prefix); // Default prefix
  }
  const serverPrefix = Nitori.servers.get(guildId);

  // Commands
  const messageArray = content.split(' ');
  const command = messageArray[0];

  if (!command.includes(serverPrefix)) return null; // Ignore regular messages

  const cleanCommand = command.slice(serverPrefix.length);
  const args = messageArray.splice(1);

  if (message.isMentioned(Nitori.user.id) || message.channel.type === 'dm') {
    let response;

    if (args.length === 0) {
      if (Nitori.plugins.size === 0) {
        response = 'My commands? I don\'t seem to have any loaded right now...';
      } else {
        response = `My commands? Sure, here you go:\n${Nitori.plugins.keyArray().join('\n')}`;
      }
    }

    return message.reply(response);
  }

  const plugin = Nitori.plugins.get(cleanCommand);
  if (plugin) return plugin(Nitori, message, args);

  return null;
});

Nitori.login(config.discordToken);
