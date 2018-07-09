/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('office', {
		officeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'office_id'
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
		tel: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: '06-2757575 ext 62500',
			field: 'tel'
		}
	}, {
		tableName: 'office',
		timestamps: false
	});
};
