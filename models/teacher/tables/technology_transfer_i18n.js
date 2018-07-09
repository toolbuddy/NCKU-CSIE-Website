/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('technologyTransferI18N', {
		technologyTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'technology_transfer',
				key: 'technology_transfer_id'
			},
			field: 'technology_transfer_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		patent: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'patent'
		},
		technology: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'technology'
		},
		authority: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'authority'
		},
		receiver: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'receiver'
		}
	}, {
		tableName: 'technology_transfer_i18n',
		timestamps: false
	});
};
