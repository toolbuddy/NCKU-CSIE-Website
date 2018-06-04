/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('educationI18N', {
		educationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'education',
				key: 'education_id'
			},
			field: 'education_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		school: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'school'
		},
		major: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'major'
		}
	}, {
		tableName: 'education_i18n',
		timestamps: false
	});
};
