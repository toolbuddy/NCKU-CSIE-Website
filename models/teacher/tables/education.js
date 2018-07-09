/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('education', {
		educationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'education_id'
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
		nation: {
			type: DataTypes.CHAR(2),
			allowNull: false,
			defaultValue: 'TW',
			field: 'nation'
		},
		degree: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'degree'
		},
		startYear: {
			type: "YEAR(4)",
			allowNull: false,
			field: 'start_year'
		},
		endYear: {
			type: "YEAR(4)",
			allowNull: true,
			field: 'end_year'
		}
	}, {
		tableName: 'education',
		timestamps: false
	});
};
