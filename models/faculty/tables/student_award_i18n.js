/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('studentAwardI18N', {
		studentAwardId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student_award',
				key: 'student_award_id'
			},
			field: 'student_award_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		award: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'award'
		}
	}, {
		tableName: 'student_award_i18n',
		timestamps: false
	});
};
