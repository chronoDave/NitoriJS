const Discord = require('discord.js');
const RP = module.require("./rp/users.json");

const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */	

module.exports.info = {
	name: "rp",
	description: "Commands for Zach's text adventures",
	args:
		cl + "time [hh]" + cl
		+ nl + cb + "Converts [hh] into local times for every registered user" + cb
		+ nl + cl + "current" + cl
		+ nl + cb + "Returns a list of the current local time of every registered user" + cb
		+ nl + cl + "dst" + cl
		+ nl + cb + "Returns a list of DST status of every registered user" + cb,
	examples:
		cl + "time 12" + cl
		+ nl + cl + "current" + cl
		+ nl + cl + "dst" + cl,
	list:
		"There's no specific list of arguments for this plugin."
}

let embed = new Discord.RichEmbed();

module.exports.run = async (bot, message, args) => {
	let date = new Date();
	if (args.length === 0) return message.reply("What do you want me to do?"); // Check for empty command

	let day = date.getDate();
	let month = date.getMonth();
	let minutes = date.getMinutes();
		if (minutes < 10) {minutes = "0" + minutes;}
	let offset = date.getTimezoneOffset() / 60; // Set machineTime to UTC+0, as it's biased towards the timezone it's running in
	let machineTime = date.getHours() + offset; // DON'T CHANGE THIS, EVER

	// Check for DST
	for (var key in RP) {
		if (RP.hasOwnProperty(key)) {
			if (month > RP[key].dst.startMonth && month < RP[key].dst.endMonth) {
				RP[key].isDST = "true";
			} else {
				RP[key].isDST = "false";
			}
			if (month == RP[key].dst.startMonth) {
				if (day >= RP[key].dst.startDay) {
					RP[key].isDST = "true";
				} else {
					RP[key].isDST = "false";
				}
			}
			if (month == RP[key].dst.endMonth) {
				if (day <= RP[key].dst.endDay) {
					RP[key].isDST = "true";
				} else {
					RP[key].isDST = "false";
				}
			}
		}
	}

	switch(args[0]){
		case "time": // Time planning
			if (args.length == 1) return message.reply("You have to specify a time, y'know?");
			if (!Number.isInteger(parseInt(args[1]))) return message.reply(`"${args[1]}" is not a number, last time I checked`);
			if (args[1] < 0 || args[1] > 24) return message.reply("This isn't the Lunar Capital, days last 24 hours here");

			// User timezone is machine time
			if (args.length == 2) {
				if (!RP[message.author.id]) {
					return message.reply("I'm sorry, but I can't seem to find you on my list...");
				} else {
					let userMinutes;
					if (args[1].length == 5) {
						userMinutes = args[1].substring(3,5);
					} else {
						userMinutes = "00";
					}
					// Set machine time to user timezone
					offset = RP[message.author.id].utc;
					// Check for DST
					if (RP[message.author.id].isDST == "true") {offset + 1};

					let arrayTime = [];
					for (var key in RP) {
						if (RP.hasOwnProperty(key)) {
							let userTime = parseInt(args[1]) + RP[key].utc - offset;
							if (key == message.author.id) {userTime = parseInt(args[1])} // Check for author
							// Check for DST
							if (RP[message.author.id].isDST == "true") {
								//userTime = userTime - 1;
								if (RP[key].isDST == "false") {userTime = userTime - 1};
							}
							if (RP[message.author.id].isDST == "false") {
								if (RP[key].isDST == "true") {userTime = userTime + 1};
							}
							// Check for overflow
							if (userTime >= 24) {userTime = userTime - 24};
							if (userTime < 0) {userTime = userTime + 24};
							// Check for missing numbers
							if (userTime < 10) {userTime = "0" + userTime;}
							// Put everything into the array
							arrayTime.push(userTime + ":" + userMinutes + "\u00a0-\u00a0" + RP[key].name);
						}
					}
					arrayTime = arrayTime.join("\n").replace(/,/, " ");

					embed.setColor([126,190,221]);
					embed.setAuthor(`\uD83D\uDD50 User times`);
					embed.setDescription(
						`I calculated this all by myself:`
						+"```"
						+arrayTime
						+"```"
					);
					message.channel.send(embed);
					break;
				}
			}
			break;
		case "current": // Get local times of everyone in the list	
			offset = date.getTimezoneOffset() / 60; // Set offset back to machine offset
			let arrayTime = [];
			for (var key in RP) {
				if (RP.hasOwnProperty(key)) {
					let userTime = machineTime + RP[key].utc;
					// Check for DST
					if (RP[key].isDST == "true") {userTime = userTime + 1};
					// Check for overflow
					if (userTime > 24) {userTime = userTime - 24};
					if (userTime < 0) {userTime = userTime + 24};
					// Check for missing numbers
					if (userTime < 10) {userTime = "0" + userTime;}
					// Put everything into the array
					arrayTime.push(userTime + ":" + minutes + "\u00a0-\u00a0" + RP[key].name);
				}
			}
			arrayTime = arrayTime.join("\n").replace(/,/, " ");

			embed.setColor([126,190,221]);
			embed.setAuthor(`\uD83D\uDD50 User times`);
			embed.setDescription(
				`I asked Eirin, but she told me to ask Reisen, so I'm not sure if this is correct:`
				+"```"+
				arrayTime
				+"```"
			);
			message.channel.send(embed);
			break;
		case "dst":
			let arrayDST = [];
			for (var key in RP) {
				if (RP.hasOwnProperty(key)) {
					if (RP[key].isDST == "true") {
						arrayDST.push(RP[key].name + " is observing DST");
					} else {
						arrayDST.push(RP[key].name + " is NOT observing DST");
					}
				}
			}
			arrayDST = arrayDST.join("\n").replace(/,/, " ");

			embed.setColor([126,190,221]);
			embed.setAuthor(`\uD83D\uDD50 User DST`);
			embed.setDescription(
				`This is the DST data according to Aya:`
				+"```"+
				arrayDST
				+"```"
			);
			message.channel.send(embed);
			break;
	}
}