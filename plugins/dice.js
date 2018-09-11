const Dice = module.require("droll");

const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */	

module.exports.info = {
	name: "roll",
	description: "Rolls dice using common dice notation: https://en.wikipedia.org/wiki/Dice_notation",
	args:
		cl + "<n>d[n] <(n)value>" + cl
		+ nl + cb + li + "Rolls dice. Roll single dice using d[n] or 1d[n].\nRoll multiple dice using [n]d[n].\nRoll named dice using [n]d[n] value1,value2 (input as many values as you roll dice)." + cb,
	examples:
		cl + "d6" + cl
		+ nl + cl + "d6 STR" + cl
		+ nl + cl + "3d6" + cl
		+ nl + cl + "3d6 HP,STR,DEX" + cl,
	list: 
		"There's no specific list of arguments for this plugin."
};

module.exports.run = async (bot, message, args) => {
	if(args.length === 0) return message.reply("How many dice do you wish to roll?");
	if(Dice.validate(args[0])) {
		let dice = Dice.roll(args[0]);
		
		// Get the amount of dice
		if (args[0].substring(0,args[0].indexOf("d")) == 0){
			diceAmount = 1;
		} else {
			diceAmount = args[0].substring(0,args[0].indexOf("d"));
		};

		if (diceAmount > 100) return message.reply("I can't roll that many dice!");

		// Check for named dice
		let diceNames;
		let diceResultNamed;

		if(args[1]) {
			diceNames = args[1].split(",");
			if(diceNames.length < diceAmount) return message.reply("You didn't specify enough dice!");
			if(diceNames.length > diceAmount) return message.reply("You specified too many dice!");
			
			// Combine arrays
			for (let i in dice.rolls){
				i++;
				diceNames.splice((i*2)-1,0,dice.rolls[i-1]+"#");
			};

			diceResultNamed = diceNames.join(": ").replace(/,/g, " ").split("#:").join(", ");
			diceResultNamed = diceResultNamed.substring(0,diceResultNamed.length-1);
		};

		// Markup for separate dice values
		let diceResult = dice.rolls.join(", ");
		
		// Dice total
		let diceTotal = `(${dice.total})`;

		// Create embed		
		switch(args.length){
			case 1: // Nameless dice roll(s)
				if(diceAmount === 1) {
					return message.reply(`You rolled: **${diceTotal}**`);
				} else {
					return message.reply(`You rolled **${diceAmount}** dice:`+"```"+`\n${diceResult}`+"```"+`\nGiving you a total of: **${diceTotal}**`);
				};
				break;
			case 2: // Named dice
				if(diceAmount === 1) {
					return message.reply(`You rolled: **${diceResultNamed}**`);
				} else {
					return message.reply(`You rolled **${diceAmount}** dice:`+"```"+`\n${diceResultNamed}`+"```"+`\nGiving you a total of: **${diceTotal}**`);
				};
				break;
			default: // Everything else
				return message.reply("I'm not sure what that command is, the format is /roll (n)dn(+n) (name1, name2...)");
		};
	} else {
		return message.reply("Please use the common dice notation: https://en.wikipedia.org/wiki/Dice_notation");
	};
};