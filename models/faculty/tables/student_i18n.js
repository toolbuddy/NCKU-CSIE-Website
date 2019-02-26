/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('studentI18N', {
		studentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'student_id'
			},
			field: 'student_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'student_i18n',
		timestamps: false
	});
};
