const Presence = require('./presence.json');
const presenceList = Presence.list;

module.exports = {
	random: function(bot) {
		let random = Math.floor(Math.random() * presenceList.length);
		let randomName = presenceList[random].status; 
		let randomType = presenceList[random].type;

		try {
			bot.user.setPresence({
				game: {
					name: randomName,
					type: randomType
				}
			});
			if (randomType == "listening") {
				return `Let's see... I'll be ${randomType} to ${randomName}, then!`;
			} else {
				return `Let's see... I'll be ${randomType} ${randomName}, then!`
			}
		}
		catch (e) {
			return `Contact Chrono and send him this: ${e.stack}`;
		}
	},
	watching: function(status, bot) {
		try {
			bot.user.setPresence({
				game: {
					name: status,
					type: "WATCHING"
				}
			});
			return `Alright, I'll be watching ${status}!`;
		}
		catch (e) {
			return `Contact Chrono and send him this: ${e.stack}`;
		}
	},
	listening: function(status, bot) {
		try {
			bot.user.setPresence({
				game: {
					name: status,
					type: "LISTENING"
				}
			});
			return `Alright, I'll be listening to ${status}!`;
		}
		catch (e) {
			return `Contact Chrono and send him this: ${e.stack}`;
		}
	},
	playing: function(status, bot) {
		try {
			bot.user.setPresence({
				game: {
					name: status,
					type: "PLAYING"
				}
			});
			return `Alright, I'll be playing ${status}!`;
		}
		catch (e) {
			return `Contact Chrono and send him this: ${e.stack}`;
		}
	}
}