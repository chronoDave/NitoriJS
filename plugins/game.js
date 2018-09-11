const Text = module.require("./game/text.json");
const NG = module.require("./game/newGame+.json");
const ValidAction = module.require("./game/synonyms.json");

const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */	

module.exports.info = {
	name: "game",
	description: "The official Chronofantasia Text Adventure!",
	args:
		cl + "set" + cl
		+ nl + cb + "Sets the player." + cb
		+ nl + cl + "start" + cl
		+ nl + cb + "Start the game." + cb
		+ nl + cl + "[command]" + cl
		+ nl + cb + "Execute [command] (only available during the game)." + cb
		+ nl + cl + "reset" + cl
		+ nl + cb + "Resets the game; currently only available to Chronocide." + cb
		+ nl + cl + "debug [beat]" + cl
		+ nl + cb + "Gets text from specific beat; currently only available to Chronocide." + cb,
	examples:
		cl + "set" + cl
		+ nl + cl + "start" + cl
		+ nl + cl + "look around" + cl
		+ nl + cl + "reset" + cl
		+ nl + cl + "debug bt1" + cl,
	list: 
		"There's a list of arguments, but listing them here would be silly, right?"
}

let player = "";
let state = "INIT";

let beat;
let round = "1";
let isEdited = 0;

function getTitle(bt, rd) {
	return NG[bt][rd].title;
}

function getAction(bt, rd, action, modifier) {
	let beatAction = NG[bt][rd].actions;

	// Check for valid action
	for (synonym in ValidAction) {
		if (ValidAction[synonym].includes(action)) {
			// A synonymous action is found
			if (beatAction.hasOwnProperty(synonym)) {
				// A beat action has been found
				if (beatAction[synonym].hasOwnProperty("advance")) {
					// Are we dealing with a plot action
					beat = "bt" + beatAction[synonym].advance; // Increment the beat
					isEdited = 0;
					return NG[beat][rd].text;
				}
				if (modifier !== undefined) {
					// There's a secondary action (such as looking)
					if (beatAction[synonym].hasOwnProperty(modifier.toLowerCase())) {
						// Secondary action found
						return beatAction[synonym][modifier.toLowerCase()];
					} else {
						return beatAction[synonym].default;
					}
				} else {
					// Normal action
					return beatAction[synonym].default;
				}
			}
		}
	}
	// Default action
	if (beatAction.default.hasOwnProperty("advance")) {
		// Increase round
		beat = "bt" + beatAction.default.advance; // Increment the beat
		round = beatAction.default.round; // Increment round
		isEdited = 0;
		return NG[beat][round].text;
	} else {
		return beatAction.default;
	}
}

module.exports.run = async (bot, message, args) => {
	// The person who calls the command runs the game
	if (args[0] === "reset" && message.author.id === "134313713435017216") {
		state = "INIT";
		player = "";
		round = "1";
		message.channel.send("Game reset");
	}

	if (args.length !== 0) {
		switch (state) {
			case "INIT":
				// Register the player
				switch (args[0]) {
					case "set":
						if (player === "") {
							player = message.author.id;
							return message.channel.send("You're set! Type b!game start to begin!");
						} else {
							if (player === message.author.id) {
								return message.channel.send("You are already registered");
							} else {
								return message.channel.send("I'm sorry, but I can't run multiple games at once, you'll have to wait!");
							}
						}
					case "start":
						if (player === "") return message.channel.send("Uhh, who's playin'?");
						if (player !== message.author.id) return message.channel.send("You aren't the one who registered, are you?");
						
						state = "ENTER";
						let embed = new Discord.RichEmbed()
							.setAuthor("Chronofantasia: The Text Adventure")
							.setColor("#3498db")
							.addField("Introduction", NG["bt0"].text);
						return message.channel.send(embed);
					case "debug":
						if (message.author.id !== "134313713435017216") return message.reply("And who are you to tell me what to do?");
						let embedDebug = new Discord.RichEmbed()
							.setAuthor("Chronofantasia: The Text Adventure")
							.setColor("#3498db")
							.addField(getTitle(args[1]), Text[args[1]].text);
						if (Text[args[1]].hasOwnProperty("image")) {
							embedDebug.setImage(Text[args[1]].image);
						}
						return message.channel.send(embedDebug);
					}
				break;
			case "ENTER":
				if (args[0] === "enter") {
					state = "GAME";
					beat = "bt1";
	
					let embed = new Discord.RichEmbed()
						.setAuthor("Chronofantasia: The Text Adventure")
						.setColor("#3498db")
						.addField(getTitle(beat, "1"), NG["bt1"]["1"].text);
					return message.channel.send(embed);
				}
			case "GAME":
				let action = args[0].toLowerCase();
				let modifier = args[2];

				let embed = new Discord.RichEmbed()
					.setAuthor("Chronofantasia: The Text Adventure")
					.setColor("#3498db")
					.addField(getTitle(beat, round), getAction(beat, round, action, modifier));
		
					if (NG[beat][round].hasOwnProperty("edit") && isEdited === 0) {
						setTimeout(function() {
							let edit = new Discord.RichEmbed(bot.user.lastMessage.embeds[0])
							bot.user.lastMessage.edit({
								"embed": {
									"author": {
										"name": edit.author.name
									},
									"color": edit.color,
									"fields": [{
										"name": edit.fields[0].name,
										"value": NG[beat][round].edit
									}]
								}
							})
						}, 4000); // Change the message after 4 seconds
						isEdited = 1;
					}
				console.log("beat: " + beat + " round: " + round);
				return message.channel.send(embed);
		}
	}
}