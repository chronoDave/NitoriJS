const Sequelize = require('sequelize');
const Presence = require('./presence.js');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	// SQLite only
	storage: 'database.sqlite'
});

const Permissions = sequelize.define('permissions', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	name: Sequelize.STRING,
});

const Prefix = sequelize.define('prefix', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	name: Sequelize.STRING,
	prefix: Sequelize.STRING
})

module.exports = {
	// Admin user functions
	create: function(debug) {
		if (!debug) {
			Permissions.sync();
			Prefix.sync();
		} else {
			Permissions.sync({force: true});
			Prefix.sync({force: true});
		}
	},
	add: async function(user, id) {
		try {
			await Permissions.create({
				id: user.id,
				name: user.username + '#' + user.discriminator
			});
			return `User ${user.username} added.`;
		}
		catch (e) {
			if (e.name = "SequelizeUniqueConstraintError") return `${user.username + '#' + user.discriminator} already exists`;
			return 'If you see this, contact Chronocide';
		}
	},
	list: async function() {
		let list = await Permissions.findAll({attributes: ['name']});
		if (list.length == 0) return "There are no users in the database";
		return list.map(t => t.dataValues.name).join(', ')
	},
	delete: async function(user) {
		let deletedEntries = await Permissions.destroy({where: {id: user.id}});
		if (!deletedEntries) return `That user didn't exist`;
		return 'User deleted';
	},
	check: async function(user) {
		let checkedUser = await Permissions.findOne({where: user.id});
		if (!checkedUser) return false;
		return true;
	},
	// Prefix functions
	prefix: async function(channel, command, prefix) {
		switch (command) {
			case `set`:
				try {
					await Prefix.create({
						id: channel.id,
						name: channel.name,
						prefix: prefix
					});
					return `Prefix for this server set to ${prefix}`;
				}
				catch (e) {
					if (e.name = "SequelizeUniqueConstraintError") {
						let changedPrefix = await Prefix.update({prefix: prefix}, {where: {id: channel.id}});
						if (changedPrefix > 0) return `Prefix set to ${prefix}`;
						return `Could not find a custom prefix for this server, perhaps it's not set yet?`;
					}
					return 'If you see this, contact Chronocide';
				}
			case 'get':
				let checkedPrefix = await Prefix.findOne({where: {id: channel.id}});
				if (checkedPrefix) return checkedPrefix.prefix;
				return false;
			default:
				return '`' + `${command}` + '`' + ` is not a valid command`;
		}
	},
	// Server functions
	server: function(command, id, bot) {
		switch (command) {
			case 'list':
				let arrayMessage = [];
				for (var [key, value] of bot.guilds) {
					arrayMessage.push(`${key} - ${bot.guilds.get(key).name}`);
				}
				return arrayMessage;
			case 'leave':
				try {
					bot.guilds.get(id).leave();
					return `I've left` + '`' + `${bot.guilds.get(id).name}` + '`';
				}
				catch (err) {
					return `I can't leave that server, did you get the ID wrong?`;
				}
			default:
				return '`' + `${command}` + '`' + ` is not a valid command`;
		}
	},
	// Self functions
	self: function(command, arg, status, bot) {
		switch (command) {
			case 'status':
				if (status.includes('<@')) return `I can't process highlights, please type the user's name instead!`;
				switch (arg) {
					case 'random':
						return Presence.random(bot);
					case 'watching':
						return Presence.watching(status, bot)
					case 'listening':
						return Presence.listening(status, bot)
					case 'playing':
						return Presence.playing(status, bot)
					case undefined:
						return 'What status do you have in mind?';
					default:
						return `That's not a valid status`;
				}
			case 'avatar':
				if (arg == undefined) return 'What avatar do you have in mind?';
				if (arg.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g)) {
					try {
						bot.user.setAvatar(arg);
						return 'New avatar set!';
					}
					catch(e) {
						return `Contact Chrono and send him this: ${e.stack}`;
					}
				} else {
					return `I can't use that format, please provide a .png, .gif or .jpg image.`;
				}
			case 'name':
				if (arg == undefined) return 'What name do you have in mind?';
				try {
					bot.user.setUsername(arg.match());
					return `I have renamed myself to ${arg}!`;
				}
				catch (e) {
					return `Contact Chrono and send him this: ${e.stack}`;
				}
			default:
				return '`' + `${command}` + '`' + ` is not a valid command`;
		}
	}
}