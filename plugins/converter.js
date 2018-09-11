const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */	

module.exports.info = {
	name: "convert",
	description: "For those heathens who don't use metric",
	args:
		cl + "[unit] [amount]" + cl
		+ nl + cb + li + "Converts [unit] into imperial or metric (metric -> imperial / imperial -> metric)" + cb,
	examples: 
		cl + "yard 100" + cl,
	list:
		cl + "[unit]" + cl
		+ nl + cb + "yard, feet, meter, inch, cm" + cb
}

module.exports.run = async (bot, message, args) => {
	if (args.lenght !== 0) {
		switch (args[0]) {
			case "yard":
				return message.reply(Math.round(args[1] * 0.9144 * 100) / 100 + "m");
			case "feet":
				return message.reply(Math.round(args[1] * 0.3048 * 100) / 100 + "m")
			case "meter":
				return message.reply(
					Math.round(args[1] * (1 / 0.9144) * 100) / 100 + " yard / " +
					Math.round(args[1] * (1 / 0.3048) * 100) / 100 + " feet"
				);
			case "inch":
				return message.reply(Math.round(args[1] * 2.54 * 100) / 100 + "cm");
			case "cm":
				return message.reply(Math.round(args[1]* (1 / 2.54) * 100) / 100 + " inch");
		} 
	}
}