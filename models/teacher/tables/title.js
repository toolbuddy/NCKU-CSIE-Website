/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('title', {
		titleId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'title_i18n',
				key: 'title_id'
			},
			field: 'title_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'start_date'
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'end_date'
		}
	}, {
		tableName: 'title',
		timestamps: false
	});
};
