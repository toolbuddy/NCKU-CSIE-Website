/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('titleI18N', {
		titleId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'title_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'title'
		}
	}, {
		tableName: 'title_i18n',
		timestamps: false
	});
};
