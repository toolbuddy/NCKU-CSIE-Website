/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project', {
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'project_id'
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
		startYear: {
			type: "YEAR(4)",
			allowNull: false,
			field: 'start_year'
		},
		endYear: {
			type: "YEAR(4)",
			allowNull: true,
			field: 'end_year'
		},
		category: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			field: 'category'
		}
	}, {
		tableName: 'project',
		timestamps: false
	});
};
