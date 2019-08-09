const Sequelize = require('sequelize');

const Database = new Sequelize('database', 'admin', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite
  storage: 'database.sqlite'
});

const Prefix = Database.define('prefix', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: Sequelize.STRING,
  prefix: Sequelize.STRING
});

Prefix.sync();

const get = async id => {
  try {
    const doc = await Prefix.findOne({ where: { id } });
    if (doc) return doc.dataValues;
    return doc;
  } catch (err) {
    throw err;
  }
};

const set = async (id, prefix) => {
  try {
    const doc = await Prefix.create({ id, prefix });
    return doc.dataValues;
  } catch (err) {
    throw err;
  }
};

const update = async (id, prefix) => {
  try {
    await Prefix.update({ prefix }, { where: { id } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  create: () => ({
    instance: Database,
    prefix: {
      get,
      set,
      update
    }
  })
};
