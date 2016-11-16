module.exports = function(sequelize, Datatypes) {
	return sequelize.define('car', {
		name: { 
			type: Datatypes.STRING,
			allowNull: false
		},
		manufacturer: { 
			type: Datatypes.STRING,
			allowNull: false
		},
		details: { 
			type: Datatypes.STRING,
			allowNull: false
		}
		// 	name: Sequelize.STRING,
		// 	manufacturer: Sequelize.STRING,
		// 	details: Sequelize.STRING
	});
};