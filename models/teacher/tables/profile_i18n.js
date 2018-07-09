/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profileI18N', {
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
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name'
		}
	}, {
		tableName: 'profile_i18n',
		timestamps: false
	});
};
