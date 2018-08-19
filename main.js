const Discord = require('discord.js');
const Settings = require('./components/settings.json');

const fs = require('fs');
const dirPlugins = './plugins/';

const Nitori = new Discord.Client({disableEveryone: true});
Nitori.plugins = new Discord.Collection();

// ------------- Components ------------- //
const Presence = require('./components/presence.js');

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

	Presence.randomPresence(Nitori);
	console.log('\x1b[32m%s\x1b[0m', 'Discord successfully initialized, Nitori ready for duty!');
});

// ------------- Discord Main ------------- //
Nitori.on('message', async message => {
	if (message.author.bot) return; // Ignore bots
});

// ------------- Discord Login ------------- //
Nitori.login(Settings.token);