/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('departmentI18N', {
		departmentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'department_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		department: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'department'
		}
	}, {
		tableName: 'department_i18n',
		timestamps: false
	});
};
