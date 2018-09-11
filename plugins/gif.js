const Discord = require('discord.js');
const Gif = module.require("./gif/gif.json");
const gifKeys = Object.keys(Gif);

const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */

var listMeme = [];
var listAnime = [];

for (var i = 0; i < Gif.meme.length; i++) {
	listMeme.push(Gif.meme[i].name);
}

for (var i = 0; i < Gif.anime.length; i++) {
	listAnime.push(Gif.anime[i].name);
}

listMeme = listMeme.join(",\u0020");
listAnime = listAnime.join(",\u0020");

module.exports.info = {
	name: "gif",
	description: "Chrono's magical GIF module",
	args:
		cl + "random" + cl
		+ nl + cb + "Returns a random GIF." + cb
		+ nl + cl + "list <category>" + cl
		+ nl + cb + "Returns a list of categories (or GIFs within that category)" + cb
		+ nl + cl + "[category] [gif]" + cl
		+ nl + cb + "Returns the specified GIF" + cb,
	examples:
		cl + "random" + cl
		+ nl + cl + "list" + cl
		+ nl + cl + "list anime" + cl
		+ nl + cl + "anime smug" + cl,
	list:
		cl + "[meme]" + cl
		+ nl + cb + listMeme + cb
		+ nl + cl + "[anime]" + cl
		+ nl + cb + listAnime + cb
}

function randomGif() {
	let randomKey = gifKeys[Math.floor(Math.random() * gifKeys.length)];
	return Gif[randomKey][Math.floor(Math.random() * Gif[randomKey].length)].link;
}

let embed = new Discord.RichEmbed();

module.exports.run = async (bot, message, args) => {
	// Check for empty command
	if (args.length === 0) return message.reply("What GIF do you want me to send?");
	// Check for commands
	switch (args[0]) {
		case "random":
			return message.reply(randomGif());
		case "list":
			if (args.length === 1) {
				let arrayList = gifKeys.join("\n\u2000\u2022\u0020").replace(/,/, " ");
				embed.setColor([126,190,221]);
				embed.setAuthor(`\uD83C\uDFAC GIF categories`);
				embed.setDescription(
					`These are the categories I currently known of:`
					+"```"
					+"\u2000\u2022\u0020"
					+arrayList
					+"```"
				);
			}
			if (args.length === 2) {
				if (gifKeys.includes(args[1])) {
					let nameList = [];
					for (key in Gif[args[1]]) {
						nameList.push(Gif[args[1]][key].name);
					}
					nameList = nameList.join("\n\u2000\u2022\u0020").replace(/,/, " ");
					embed.setColor([126,190,221]);
					embed.setAuthor(`\uD83C\uDFAC GIFs in "${args[1]}"`);
					embed.setDescription(
						`These are the GIFs I have in the category "${args[1]}":`
						+"```"
						+"\u2000\u2022\u0020"
						+nameList
						+"```"
					);
				} else {
					return message.reply(`I'm sorry, but that category doesn't exist.\nYou can use "/gif list" to get an overview of the categories I'm currently aware of.`);
				}
			}
			if (args.length > 2) return message.reply("I don't do subcategories, sorry.")
			return message.channel.send(embed);
	}
	// Check for specific GIF's
	if (args.length > 0) {
		if (args.length === 1) return message.reply("Please specify a specific GIF.");
		if (gifKeys.includes(args[0])) {
			let isExist = false;
			// Loop through all entries in the category
			for (key in Gif[args[0]]) {
				// Check for specific name in category
				if (Gif[args[0]][key].name === args[1]) {
					isExist = true;
					message.channel.send(Gif[args[0]][key].link);

					// Get the current guild using guild ID
					let currentGuildID = message.member.guild.id;
					let currentGuild = bot.guilds.get(currentGuildID);
					// Check if Tewi has the appropriate permissions
					if (currentGuild.me.hasPermission("MANAGE_MESSAGES")) {
						message.author.lastMessage.delete();
					} else {
						console.log("\u001b[31mTewi doesn't have MANAGE_MESSAGES permissions in: \u001b[0m", message.member.guild.name);
					}
				}
			}
			if (!isExist) {
				message.reply(`Sorry, I couldn't find any "${args[1]}" GIFs in the category "${args[0]}"`);
			}
		} else {
			message.reply("I'm sorry, but I don't have any GIFs in that category!");
		}
	}
}