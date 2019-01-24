/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('labI18N', {
		labId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'lab_id'
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
			allowNull: false,
			field: 'name'
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'address'
		}
	}, {
		tableName: 'lab_i18n',
		timestamps: false
	});
};
