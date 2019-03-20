const Sequelize = require('sequelize');
const commands = require('./models/commandsModel.js');
const guilds = require('./models/guildModel.js');
const config = require('./config.json');
require('colors');

// Database connection
const dbinfo = `${config.database}`;

const sequelize = new Sequelize(config.database, {
	dialect: 'postgres',
	logging: false,
	operatorsAliases: false,
});

sequelize.authenticate().then(() => console.log(`Connected to ${dbinfo}`.blue.bold))
	.catch(err => console.error(`Unable to connect to the database:`.red.bold, err));

const commandModel = commands(sequelize, Sequelize);
const guildModel = guilds(sequelize, Sequelize);

const sync = async () => {
	console.log('Synchronized database');
	// const sync = await sequelize.sync({force: true});
	await sequelize.sync();
};

sync();

module.exports = {
	commandModel,
	guildModel,
};
