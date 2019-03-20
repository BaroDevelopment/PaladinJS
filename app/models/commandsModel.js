module.exports = (db, Sequelize) => {
	return db.define('commands', {
		id: {
			type: Sequelize.TEXT,
			primaryKey: true,
			autoIncrement: false,
			allowNull: false,
		},
		name: {
			type: Sequelize.TEXT,
			primaryKey: true,
			allowNull: false,
		},
		category: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		enabled: {
			type: Sequelize.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
		bannedChannels: {
			type: Sequelize.ARRAY(Sequelize.TEXT),
			defaultValue: [],
			allowNull: false,
		},
		bannedRoles: {
			type: Sequelize.ARRAY(Sequelize.TEXT),
			defaultValue: [],
			allowNull: false,
		},
	});
};