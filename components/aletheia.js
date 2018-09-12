const Modifiers = require('./modifiers.json');

var isTruth = false;

module.exports = {
	send: function(text) {
		if (!isTruth) return text; // Ignore if disabled
		
		let truth = '';
		for (var i = 0; i < text.length; i++) {
			truth += text.substr(i, 1);
			loop = Math.floor(2 + Math.random() * 31);

			for (var j = 0; j < loop; j++) {
				let random = Math.floor(Math.random() * Modifiers["list"].length);
				truth += Modifiers.list[random];
			}	
		}
		return truth;
	},
	enable: function() {
		 isTruth = true;
		 return 'Truth enabled';
	},
	disable: function() {
		isTruth = false;
		return 'Truth disabled';
	},
	isTruth: function() {
		return isTruth;
	}
}