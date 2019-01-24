/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('conference', {
		conferenceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'conference_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		hostYear: {
			type: "YEAR(4)",
			allowNull: false,
			field: 'host_year'
		}
	}, {
		tableName: 'conference',
		timestamps: false
	});
};
