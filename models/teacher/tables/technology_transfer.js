/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('technologyTransfer', {
		technologyTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'technology_transfer_id'
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
		nscNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'nsc_number'
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
		tableName: 'technology_transfer',
		timestamps: false
	});
};
