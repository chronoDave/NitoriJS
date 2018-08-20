const Sequelize = require('sequelize');

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
		unique: true,
		primaryKey: true
	},
	name: Sequelize.STRING,
	guild: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = {
	create: function(debug) {
		if (!debug) return Permissions.sync();
		return Permissions.sync({force: true});
	},
	add: async function(user, id, message) {
		try {
			await Permissions.create({
				id: user.id,
				name: user.username,
				guild: id
			});
			return message.reply(`User ${user.username} added.`);
		}
		catch (e) {
			if (e.name = "SequelizeUniqueConstraintError") return message.reply(`${user.username} already exists`);
			return message.reply('If you see this, contact Chronocide');
		}
	},
	get: async function(id) {
		let list = await Permissions.findAll({where: {guild: id}, attributes: ['name']});
		return list.map(t => t.dataValues.name).join(', ')
	}
}