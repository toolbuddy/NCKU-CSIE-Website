/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		studentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'student_id'
		},
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
		degree: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'degree'
		}
	}, {
		tableName: 'student',
		timestamps: false
	});
};
