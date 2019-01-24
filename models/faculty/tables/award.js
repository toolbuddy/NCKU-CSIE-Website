/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('award', {
		awardId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
			field: 'award_id'
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
		receiveYear: {
			type: "YEAR(4)",
			allowNull: false,
			field: 'receive_year'
		},
		receiveMonth: {
			type: DataTypes.DATEONLY,
			field: 'receive_month'
		},
		receiveDate: {
			type: DataTypes.DATEONLY,
			field: 'receive_date'
		},
	}, {
		tableName: 'award',
		timestamps: false
	});
};
