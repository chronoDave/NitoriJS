const Discord = require('discord.js');
const Settings = require('./components/settings.json');
const Cleverbot = require('cleverbot-node');

const fs = require('fs');
const dirPlugins = './plugins/';

const Nitori = new Discord.Client({disableEveryone: true});
Nitori.plugins = new Discord.Collection();

const NitoriClever = new Cleverbot;
NitoriClever.configure({botapi: Settings.tokenClever});

var prefix = Settings.prefix; // Can be changed by admin component
var truth = false; // Used for Aletheia

// ------------- Components ------------- //
const Presence = require('./components/presence.js');
const Help = require('./components/help.js');
const Admin = require('./components/admin.js');
const Aletheia = require('./components/aletheia.js');

// ------------- Plugins ------------- //
fs.readdir(dirPlugins, (e, files) => {
	console.log('Booting NitoriJS...');
	if(e) return console.log(e.stack);

	let plugins = files.filter(f => f.split('.').pop() === 'js'); // Check for .js, store in array
	if(plugins.length <= 0) return console.log(`No plugins found in: ${dirPlugins}`);

	console.log(`Found ${plugins.length} plugins, trying to load them now...`);
	// Load plugins
	plugins.forEach((f, i) => {
		try {
			let plugin = require(`${dirPlugins}${f}`); // Load files, store in array
			console.log(` - [${i+1}] ${f} loaded!`);
			Nitori.plugins.set(plugin.info.name, plugin);
		}	
		catch (e) {
			console.log(plugins[i] + " - " + e.stack);
		}
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
	console.log(Presence.random(Nitori));
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
			if (truth) {
				message.reply(Aletheia.send(response.output));
			} else {
				message.reply(response.output);
			}
			message.channel.stopTyping();
		});
	}
	// Listen to commands from here
	Admin.prefix(message.channel, "get").then(response => {
		if (response != false) prefix = response; // Check for custom prefixes	
		if(!command.startsWith(prefix)) return; // Ignore non-commands
		let noPrefix = command.slice(prefix.length);

		switch (noPrefix) {
			case 'help':
				let embed = new Discord.RichEmbed();
				Help.get(Nitori, message, args, embed);
				break;
			case 'admin':
				/* 
					Only available for bot owner or users in the database
					Oh, and the owner is omnipotent, of course
				*/
				if (message.channel.type != "text") return message.reply(`My permission only work in servers, not DM's`); // Only works in servers
				Admin.check(message.author.id).then(response => {
					if (!response && message.author.id != Settings.owner) return message.reply('Sorry, you have no permission');
					let user = message.mentions.users.array(); // Ignore other mentions for now

					switch (args[0]) {
						case 'add':
							if (user.length == 0) return `Please use @user to select people`;
							if (user.length !== 1) return `I'm sorry, but I can only add one user at a time`;
							return Admin.add(user[0]).then(response => {message.reply(response)});
						case 'list':
							return Admin.list().then(response => {
								message.reply(`Here's the list of admins: ${response}`);
							});
						case 'delete':
							if (user.length == 0) return `Please use @user to select people`;
							if (user.length !== 1) return message.reply(`I can only process a single user at a time!`);
							if (user[0].id == message.author.id) return message.reply(`You can't delete yourself from the database, silly`);
							return Admin.delete(user[0]).then(response => {message.reply(response)});
						case 'prefix':
							return Admin.prefix(message.channel, args[1], args[2]).then(response => {message.reply(response)});
						case 'server':
							return message.reply(Admin.server(args[1], args[2], Nitori));
						case 'self':
							return message.reply(Admin.self(args[1], args[2], args.slice(3, args.length).join(" "), Nitori));
						case 'truth':
							switch (args[1]) {
								case 'enable':
									truth = true;
									return message.reply(Aletheia.send(`memoRIEs ANd posSiBILiTiES are EVER moRE hiDEOus Than reALITieS`));
								case 'disable':
									truth = false;
									return message.reply(Aletheia.send(`the oldESt And sTROngEsT EMOTION of mANkINd iS fear, ANd the olDesT And StRONGEsT KINd oF FEaR IS fEaR oF tHe unkNown. `));
								case 'default':
									return message.reply('`' + args[1] + '`' + ` is not a valid argument`)
							}
						default:
							return message.reply('`' + args[0] + '`' + ` is not a valid command`);
					}
				});
				break;
		}
		let plugin = Nitori.plugins.get(noPrefix);
		if (plugin) plugin.run(Nitori, message, args); // Valid plugin? Run it.
	});
});

// ------------- Discord Login ------------- //
Nitori.login(Settings.token);