/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('projectI18N', {
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'project',
				key: 'project_id'
			},
			field: 'project_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'name'
		},
		support: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'support'
		}
	}, {
		tableName: 'project_i18n',
		timestamps: false
	});
};
