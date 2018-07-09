/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('department', {
		departmentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'department_i18n',
				key: 'department_id'
			},
			field: 'department_id'
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
		}
	}, {
		tableName: 'department',
		timestamps: false
	});
};
