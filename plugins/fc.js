const Users = module.require("./fc/users.json");
const Content = module.require("./fc/content.json");
const Colors = module.require("./fc/colors.json");

var listType = [];
var listTag = [];
var listInstance = [];

const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */

// Get listType
for (type in Users["134313713435017216"]) {
	if (type != "name") {
		listType.push(type);

		for (tag in Users["134313713435017216"][type]) {
			listTag.push(tag);

			for (instance in Users["134313713435017216"][type][tag]) {
				listInstance.push(instance);
			}
		}
	}
}

listType = listType.join(",\u0020");
listTag = listTag.join(",\u0020");
listInstance = listInstance.join(",\u0020");

module.exports.info = {
	name: "fc",
	description: "Chrono's FFXIV FC module",
	args: 
		cl + "clear <me/@user> [type / tag / instance]" + cl
		+ nl + cb + li + "Gets an overview of clears. Users is optional (only instance can be called without <me/@user>)." + cb,
	examples:
		cl + "clear garuda" + cl
		+ nl + cl + "clear me ravana" + cl
		+ nl + cl + "clear @user alex" + cl
		+ nl + cl + "clear @user raid" + cl,
	list: 
		cl + `[type]` + cl
		+ nl + cb + listType + cb
		+ nl + cl + `[tag]` + cl
		+ nl + cb + listTag + cb
		+ nl + cl + `[instance]` + cl
		+ nl + cb + listInstance + cb
}

function getInstanceName(input) {
	switch (input) {
		case "arr":
			return "A Realm Reborn";
		case "hw":
			return "Heavensward";
		case "sb":
			return "Stormblood";
		case "coil":
			return "Coils of Bahamut";
		case "alex":
			return "Alexander";
		case "delta":
			return "Deltascape";
		case "sigma":
			return "Sigmascape";
		default:
			try {
				throw new Error(`"${input}" is not a valid input for getInstanceName()`);
			}
			catch (e) {
				console.log(e.stack);
			}
			break;
	}
}

module.exports.run = async (bot, message, args) => {
	let arrayMessage = [];
	// b!fc [arg]
	if (args.length !== 0) {
		arrayMessage = [];

		switch (args[0]) {
			// Overview of clears of a single member, instance or group of instances
			case "clear":
				// ------------- Check for specific content ------------- //
				if (Content.hasOwnProperty(args[1])) {
					// Instance is found
					for (key in Content) {
						let contentType = Content[args[1]].type;
						let contentTag = Content[args[1]].tag;

						for (id in Users) {
							// Go through nesting (id => trial => arr => garuda)
							if (Users[id][contentType][contentTag][args[1]] == "false")
								arrayMessage.push(Users[id].name);
							if (Users[id][contentType][contentTag][args[1]] == "")
								arrayMessage.push("I don't have data on " + Users[id].name);
						}

						// Embed builder
						let embed = new Discord.RichEmbed()
							.setColor(Colors[Content[args[1]].color])
							.setAuthor(Content[args[1]].instance)

						// Check if everyone cleared it
						if (arrayMessage.length === 0) {
							if (contentType == "trial") {
								switch (contentTag) {
									case "arr":
										arrayMessage = `Everyone has the ${Content[args[1]].name} pony!`;
										break;
									case "hw":
										arrayMessage = `Everyone has the ${Content[args[1]].name} bird!`;
										break;
									case "sb":
										arrayMessage = `Everyone has the ${Content[args[1]].name} dog!`;
										break;
								}
							} else {
								arrayMessage = `Everyone defeated ${Content[key].name}!`;
							}
							
							embed.setDescription(
								"```"  
								+ arrayMessage
								+ "```"
							);
						} else {
							arrayMessage = arrayMessage.join("\n\u2022\u0020").replace(/,/, " ");

							if (contentType == "trial") {
								embed.setDescription(
								`These people *still* haven't gotten the ${Content[args[1]].name} mount:`
								+ "```"
								+ "\u2022\u0020"
								+ arrayMessage
								+ "```"
							);
							} else {
								embed.setDescription(
								`These people *still* haven't defeated ${Content[args[1]].name}:`
								+ "```"
								+ "\u2022\u0020"
								+ arrayMessage
								+ "```"
							);
							}
						}
						return message.channel.send(embed);					
					}
				} else {
					// ------------- Check for specific user ------------- //
					let snowflake;
					let name;

					// Check for me
					if (args[1] == "me") {
						snowflake = message.author.id;
						name = message.member.user.nickname;
						if (name == undefined) name = message.author.username;
					}

					// Check for mention
					if (message.mentions.members.firstKey() != undefined) {
						snowflake = message.mentions.members.firstKey();
						name = message.mentions.members.first().nickname;
						if (name == undefined) name = message.mentions.members.first().user.username;
					}
					
					// Check if a user is mentioned (by checking if there's a valid ID)
					if (snowflake != undefined && name != undefined) {
						if (Users.hasOwnProperty(snowflake)) {
							// Check for empty command
							if (args.length == 2) return message.reply(
								"What do you wish to know about yourself? You can currently check:" 
								+ "\n\u2022\u0020 `trial`, for an overview of all trials"
								+ "\n\u2022\u0020 `arr, hw, sb`, for an overview of all trials in a specific expansions"
								+ "\n\u2022\u0020 `garuda, ravana, shinryu, etc.` for an overview of a specific trial"
								+ "\n\u2022\u0020 `raid` for an overview of all raids"
								+ "\n\u2022\u0020 `coil, alex, sigma, delta` for an overview of an expansion-specific raid"
								+ "\n\u2022\u0020 `t7s, a1s, o7s, etc.` for an overview of a specific raid"
							);

							let embed = new Discord.RichEmbed();
							let arrayMessage = [];

							// ------------- Check for specific content ------------- //
							if (Content.hasOwnProperty(args[2])) {
								// Instance is found
								let contentType = Content[args[2]].type;
								let contentTag = Content[args[2]].tag;

								let embed = new Discord.RichEmbed()
									.setColor(Colors[Content[args[2]].color])
									.setAuthor(Content[args[2]].instance);

								// Grammar
								if (contentType == "trial") {
									switch (Users[snowflake][contentType][contentTag][args[2]]) {
										case "true":
											// Gotten pony
											embed.setDescription(
												"```"
												+ name
												+ ` has the ${Content[args[2]].name} mount`
												+ "```"
											);
											break;
										case "false":
											// Not gotten pony
											embed.setDescription(
												"```"
												+ name
												+ ` doesn't have the ${Content[args[2]].name} mount`
												+ "```"
											);
											break;
										default: 
											// Literally no idea
											embed.setDescription(
												"```"
												+ `I don't know if ${name} has the ${Content[args[2]].name} mount or not...`
												+ "```"
											);
											break;
									}
								} else {
									switch (Users[snowflake][contentType][contentTag][args[2]]) {
										case "true":
											// Cleared raid
											embed.setDescription(
												"```"
												+ name
												+ ` defeated ${Content[args[2]].name}!`
												+ "```"
											);
											break;
										case "false":
											// Not cleared raid
											embed.setDescription(
												"```"
												+ name
												+ ` hasn't defeated ${Content[args[2]].name} yet!`
												+ "```"
											);
											break;
										default:
											embed.setDescription(
												"```"
												+ `I don't know if ${name} has defeated ${Content[args[2]].name} or not...`
												+ "```"
											);
											break;
									}
								}

								return message.channel.send(embed); 
							}

							// ------------- Check for main category ------------- //
							if (Users[snowflake].hasOwnProperty(args[2])) {
								// Category found (trial / raid)
								// Go through every collection
								for (key in Users[snowflake][args[2]]) {
									// Go through every entry in said collection
									for (instance in Users[snowflake][args[2]][key]) {
										switch (Users[snowflake][args[2]][key][instance]) {
											case "true":
												arrayMessage.push(instance + ": Yes");
												break;
											case "false":
												arrayMessage.push(instance + ": No");
												break;
											default:
												arrayMessage.push(instance + ": No idea");
												break;
										}
									}

									arrayMessage = arrayMessage.join("\n\u2022\u0020").replace(/,/, " ");

									embed.setAuthor(`${name} ${args[2]} data: `);
									embed.setDescription(`This is all the ${args[2]} data I could find: `);
									embed.setColor(Colors["pink"]);
									embed.addField(
										getInstanceName(key),
										"```"
										+ "\n\u2022\u0020"
										+ arrayMessage
										+ "```"
									);

									arrayMessage = [];
								}
							} else {
								// ------------- Check for subcategory ------------- //
								for (type in Users[snowflake]) {
									if (Users[snowflake][type].hasOwnProperty(args[2])) {
										// Subcategory found (coil, sb, etc.)
										for (instance in Users[snowflake][type][args[2]]) {
											switch (Users[snowflake][type][args[2]][instance]) {
												case "true":
													arrayMessage.push(instance + ": Yes");
													break;
												case "false":
													arrayMessage.push(instance + ": No");
													break;
												default:
													arrayMessage.push(instance + ": No idea");
													break;
											}
										}

										arrayMessage = arrayMessage.join("\n\u2022\u0020").replace(/,/, " ");
										
										embed.setAuthor(`${name} ${getInstanceName(args[2])} data: `);
										embed.setDescription(`This is all the ${getInstanceName(args[2])} data I could find: `);
										embed.setColor(Colors["pink"]);

										embed.addField(
											getInstanceName(args[2]),
											"```"
											+ "\n\u2022\u0020"
											+ arrayMessage
											+ "```"
										);
									}
								}
							}
							return message.channel.send(embed);
						}
					}
				}
				break;
			// Catch invalid commands
			default:
				return message.reply(`"${args[0]}" is invalid`);
		}
	}
}