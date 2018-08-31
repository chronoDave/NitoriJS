const nl = "\n" // (N)ew (L)ine
const li = "\u2022\u0020" // Bulletin point
const cl = "`" // (C)ode (L)ine
const cb = "```" // (C)ode (B)lock */	

module.exports.info = {
	name: "mball",
	description: "8-ball plugin, inspired by Zach's text adventures.",
	args:
		cl + "[question]" + cl
		+ nl + cb + "Asks the question." + cb,
	examples:
		cl + "[mball] " + "will robots take over the world?" + cl,
	list:
		"There's no list of arguments for this plugin."
}

let response = [
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"( ͡° ͜ʖ ͡°)",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful"
];

module.exports.run = async (bot, message, args, Aletheia) => {
	// Check for empty command
	if (args.length === 0) {
		let text = ':8ball: `"'+response[14]+'"`';
		return message.channel.send(text);
	}
	let rand = Math.floor(Math.random() * response.length);
	return message.channel.send(
		':8ball: `"'
		+ Aletheia.send(response[rand])
		+ '"`'
	);
}