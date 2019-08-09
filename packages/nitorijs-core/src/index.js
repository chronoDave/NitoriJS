const Discord = require('discord.js');

// Plugins
const config = require('./config');

const Nitori = new Discord.Client({ disableEveryone: true });
Nitori.plugins = new Discord.Collection();

Nitori.on('ready', async () => {
  console.log('Booting NitoriJS...');

  config.add(Nitori.plugins);

  console.log('Discord successfully initialized, Nitori ready for duty!');
});

Nitori.on('message', message => {
  const { content, author } = message;
  if (author.bot) return null; // Ignore bots

  // Commands
  if (!config.prefix) return console.log('No prefix found in config.js');

  const messageArray = content.split(' ');
  const rawCommand = messageArray[0];
  const command = rawCommand.slice(config.prefix.length);
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

  if (!rawCommand.includes(config.prefix)) return null; // Ignore non-commands

  const plugin = Nitori.plugins.get(command);
  if (plugin) return plugin.run(Nitori, message, args);

  return null;
});

Nitori.login(config.discordToken);
