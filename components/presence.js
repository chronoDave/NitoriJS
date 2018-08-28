const Presence = require('./presence.json');
const presenceList = Presence.list;

module.exports = {
	randomPresence: function(bot) {
		let random = Math.floor(Math.random() * presenceList.length);
		let randomStatus = presenceList[random].status; 
		let randomType = presenceList[random].type;

		bot.user.setPresence({
			game: {
				name: randomStatus,
				type: randomType
			}
		});

		return console.log(` - Presence set to: ${randomType} ${randomStatus}`);
	}
}