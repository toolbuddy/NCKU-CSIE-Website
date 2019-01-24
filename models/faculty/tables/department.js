/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('department', {
		departmentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
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
		},
		type: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			field: 'type'
		}
	}, {
		tableName: 'department',
		timestamps: false
	});
};
