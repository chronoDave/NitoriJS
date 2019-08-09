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
    if (args.length === 0) {
      if (Nitori.plugins.size === 0) return message.reply('My commands? I don\'t seem to have any loaded right now...');

      const response = `My commands? Sure, here you go: \n\`\`\` - ${Nitori.plugins.keyArray().join('\n - ')}\`\`\`\n You can use these commands with the prefix: \`${serverPrefix}\``;
      return message.reply(response);
    }

    if (args[0] === 'prefix') {
      if (!args[1]) return message.reply(`I'm currently using \`${serverPrefix}\` as prefix.`);

      await Nitori.database.prefix.update(guildId, args[1]);

      const server = await Nitori.database.prefix.get(guildId);
      Nitori.prefix.set(guildId, server.prefix); // Update cache

      return message.reply(`Updated prefix to: \`${server.prefix}\``);
    }

    // Execute mention-based plugins
    const plugins = Nitori.plugins.filter(plugin => plugin.mention);
    plugins.keyArray().forEach(key => Nitori.plugins.get(key).run(Nitori, config, message, args));
  }

  // Plugins
  const command = messageArray[0];
  const cleanCommand = command.slice(serverPrefix.length);
  const plugin = Nitori.plugins.get(cleanCommand);

  if (!command.includes(serverPrefix) || !plugin) return null; // Ignore regular messages
  return plugin.run(Nitori, config, message, args);
});

Nitori.login(config.discordToken);
