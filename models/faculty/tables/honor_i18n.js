/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('honorI18N', {
		honorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'honor',
				key: 'honor_id'
			},
			field: 'honor_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		honor: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'honor'
		}
	}, {
		tableName: 'honor_i18n',
		timestamps: false
	});
};
