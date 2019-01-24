/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('conference', {
		conferenceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
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
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'host_year'
		}
	}, {
		tableName: 'conference',
		timestamps: false
	});
};
