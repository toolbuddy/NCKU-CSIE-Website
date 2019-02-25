/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('experienceI18N', {
		experienceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'experience',
				key: 'experience_id'
			},
			field: 'experience_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		organization: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'organization'
		},
		department: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'department'
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'title'
		}
	}, {
		tableName: 'experience_i18n',
		timestamps: false
	});
};
