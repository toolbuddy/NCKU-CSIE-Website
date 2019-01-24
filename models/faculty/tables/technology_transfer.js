/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('technologyTransfer', {
		technologyTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
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
		from: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'from'
		},
		to: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'to'
		}
	}, {
		tableName: 'technology_transfer',
		timestamps: false
	});
};
