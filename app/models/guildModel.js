module.exports = (db, Sequelize) => {
	return db.define('guilds', {
		id: {
			type: Sequelize.TEXT,
			primaryKey: true,
			unique: true,
			autoIncrement: false,
			allowNull: false,
		},
		prefix: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		name: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		welcomeMessage: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		welcomeAvatar: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		ticketMessage: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		welcomeDM: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		ticketChannel: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
	});
};