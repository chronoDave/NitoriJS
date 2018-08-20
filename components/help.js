const Settings = require('./settings.json');

module.exports = {
	get: function(bot, message, args, embed) {
		// Module-specific help
		if (bot.plugins.has(args[0])) {
			// Module found
			let plugin = bot.plugins.get(args[0]);
			embed
				.setAuthor(`\uD83D\uDD0D Plugin: ${args[0]}`)
				.setColor(Settings.color);
			if (args[1] === "list") {
				embed
					.setDescription(
						'**' + plugin.info.description + '**'
						+ `\nList of all possible commands for the ${args[0]} plugin:`
					)
					.addField('Commands:', plugin.info.list);
			} else {
				embed
					.setDescription(
						'**' + plugin.info.description + '**'
						+ `\nFor a full list of arguments, type ` 
						+ '`' + `${Settings.prefix}help ${args[0]} list` + '`'
					)
					.addField('Commands:', plugin.info.args)
					.addField('Examples:', plugin.info.examples);
			}
			return message.channel.send(embed);
		} else if (args.length !== 0) {
			// Invalid module
			return message.reply(
				`I'm sorry, I don't have that plugin available. For a list of plugins, type` 
				+ '`' + `${Settings.prefix}help` + '`'
			);
		} else {
			// Generic help
			return message.reply(
				`These are the plugins I have loaded: `
				+ '```' + '\n\u2000\u2022\u0020' + pluginList + '```'
				+ `Type ${Settings.prefix}help [plugin] for more information about that plugin.`
			);
		}
	}
}