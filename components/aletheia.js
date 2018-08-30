const Modifiers = require('./modifiers.json');

module.exports = {
	send: function(text) {
		let truth = '';
		let summoning = 20;

		for (var i = 0; i < text.length; i++) {
			truth += text.substr(i, 1);
			loop = Math.floor(Math.random() * summoning);

			for (var j = 0; j < loop; j++) {
				let random = Math.floor(Math.random() * Modifiers["list"].length);
				truth += Modifiers.list[random];
			}	
		}

		return truth;
	}
}