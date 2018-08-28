const Discord = require('discord.js');
const Settings = require('./components/settings.json');
const Cleverbot = require('cleverbot-node');

const fs = require('fs');
const dirPlugins = './plugins/';

const Nitori = new Discord.Client({disableEveryone: true});
Nitori.plugins = new Discord.Collection();

const NitoriClever = new Cleverbot;
NitoriClever.configure({botapi: "CC8k2Ti6DbbtFUm68Wpurk3JMXw"});

const prefix = Settings.prefix;

// ------------- Components ------------- //
const Presence = require('./components/presence.js');
const Help = require('./components/help.js');
const Admin = require('./components/admin.js');

// ------------- Plugins ------------- //
fs.readdir(dirPlugins, (e, files) => {
	console.log('Booting NitoriJS...');
	if(e) return console.log(e.stack);

	let plugins = files.filter(f => f.split('.').pop() === 'js'); // Check for .js, store in array
	if(plugins.length <= 0) return console.log(`No plugins found in: ${dirPlugins}`);

	console.log(`Found ${plugins.length} plugins, trying to load them now...`);
	// Load plugins
	plugins.forEach((f, i) => {
		let plugin = require(`${dirPlugins}${f}`); // Load files, store in array
		console.log(` - [${i+1}] ${f} loaded!`);
		Nitori.plugins.set(plugin.info.name, plugin);
	});
});

// ------------- Discord Init ------------- //
Nitori.on('ready', async () => {
	// Generate invite link
	try {
		let link = await Nitori.generateInvite(["VIEW_CHANNEL", "MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"]);
		console.log("\u001b[33mInvite link: \u001b[0m" + link);
	} catch(e) {
		console.log("\u001b[31m", e.stack, "\x1b[0m");
	}
	// Components
	Presence.randomPresence(Nitori);
	Admin.create();
	console.log('\x1b[32m%s\x1b[0m', 'Discord successfully initialized, Nitori ready for duty!');
});

// ------------- Discord Main ------------- //
Nitori.on('message', async message => {
	if (message.author.bot) return; // Ignore bots
	// Command / args
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	args = messageArray.slice(1);
	// Mention
	if (message.isMentioned(Nitori.user.id)) {
		// Help
		if (args.length === 0) return message.reply(
			`Me? I can give you a list of my tools if you type` 
			+ '`' + `${prefix}help` + '`'
			+ `, if that's what you need?`
		);
		// Cleverbot
		message.channel.startTyping();
		NitoriClever.write(args.join(' '), function(response) {
			message.reply(response.output);
			message.channel.stopTyping();
		});
	}
	// Listen to commands from here
	if(!command.startsWith(prefix)) return; // Ignore non-commands
	let noPrefix = command.slice(prefix.length);
	switch (noPrefix) {
		case 'help':
			let embed = new Discord.RichEmbed();
			Help.get(Nitori, message, args, embed);
			break;
		case 'admin':
			switch (args[0]) {
				case 'add':
					let user = message.mentions.users.array();
					// Add proper error handling
					if (user.length !== 1 || message.guild == "null") return message.reply(`I'm sorry, but I can only add one user at a time`);
					Admin.add(user[0], message.guild.id, message);
					break;
				case 'get':
					Admin.get(message.guild.id).then(response => {message.reply(response)});
					break;
				default:
					return message.reply('`' + args[0] + '`' + ` is not a valid command`);
			}
			break;
	}
	let plugin = Nitori.plugins.get(noPrefix);
	if (plugin) plugin.run(Nitori, message, args); // Valid plugin? Run it.
});

// ------------- Discord Login ------------- //
Nitori.login(Settings.token);