/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('officeI18N', {
		officeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'office_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'address'
		}
	}, {
		tableName: 'office_i18n',
		timestamps: false
	});
};
